import type { FastifyBaseLogger } from 'fastify'
import type { User } from '@prisma/client'
import type { AuthRepository } from './auth.repository.js'
import type { TokenService } from './token.service.js'
import type { PasswordService } from './password.service.js'
import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from './auth.schemas.js'
import {
  ConflictError,
  EmailNotVerifiedError,
  InvalidCredentialsError,
  NotFoundError,
  TokenExpiredError,
  TokenInvalidError,
} from '../../core/errors/index.js'
import type { EmailMessage } from '../../core/email/email.service.js'
import { renderPasswordResetEmail, renderVerificationEmail } from '../../core/email/templates.js'
import { env } from '../../config/env.js'
import type { QueueService } from '../../core/queue/queue.service.js'
import { parseDeviceInfo, type DeviceInfo } from './device-info.js'

const VERIFICATION_TOKEN_TTL_HOURS = 24
const PASSWORD_RESET_TOKEN_TTL_HOURS = 1

export interface AuthResult {
  user: UserResponse
  accessToken: string
  refreshTokenValue: string
}

export interface UserResponse {
  id: string
  email: string
  username: string
  firstName: string | null
  lastName: string | null
  avatar: string | null
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    verified: user.verified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export interface AuthServiceDependencies {
  repository: AuthRepository
  tokens: TokenService
  passwords: PasswordService
  queue: QueueService
  logger: FastifyBaseLogger
}

export class AuthService {
  constructor(private readonly deps: AuthServiceDependencies) {}

  async register(input: RegisterInput): Promise<UserResponse> {
    const existingEmail = await this.deps.repository.findByEmail(input.email)
    if (existingEmail) {
      throw new ConflictError('Email is already registered', { field: 'email' })
    }

    const existingUsername = await this.deps.repository.findByUsername(input.username)
    if (existingUsername) {
      throw new ConflictError('Username is already taken', { field: 'username' })
    }

    const passwordHash = await this.deps.passwords.hash(input.password)

    const user = await this.deps.repository.create({
      email: input.email,
      username: input.username,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
    })

    await this.sendVerificationEmail(user)

    this.deps.logger.info({ userId: user.id }, 'User registered')

    return toUserResponse(user)
  }

  async login(input: LoginInput, device: DeviceInfo): Promise<AuthResult> {
    const user = await this.deps.repository.findByEmail(input.email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const valid = await this.deps.passwords.verify(user.passwordHash, input.password)
    if (!valid) {
      throw new InvalidCredentialsError()
    }

    if (!user.verified) {
      throw new EmailNotVerifiedError()
    }

    await this.deps.repository.updateLastLogin(user.id)

    return this.createSession(user, device)
  }

  async refresh(refreshTokenValue: string, _device: DeviceInfo): Promise<AuthResult> {
    const tokenHash = this.deps.tokens.hashToken(refreshTokenValue)
    const session = await this.deps.repository.findSessionByHash(tokenHash)

    if (!session) {
      throw new TokenInvalidError('Refresh token is invalid')
    }

    if (session.revokedAt) {
      throw new TokenInvalidError('Refresh token has been revoked')
    }

    if (session.expiresAt < new Date()) {
      await this.deps.repository.revokeSession(session.id)
      throw new TokenExpiredError('Refresh token has expired')
    }

    const user = await this.deps.repository.findById(session.userId)
    if (!user) {
      throw new NotFoundError('User')
    }

    const newRefresh = this.deps.tokens.createRefreshToken()
    await this.deps.repository.rotateSession(session.id, newRefresh.hash, newRefresh.expiresAt)

    const accessToken = this.deps.tokens.signAccessToken({
      sub: user.id,
      email: user.email,
      sessionId: session.id,
      type: 'access',
    })

    this.deps.logger.info({ userId: user.id, sessionId: session.id }, 'Session refreshed')

    return {
      user: toUserResponse(user),
      accessToken,
      refreshTokenValue: newRefresh.value,
    }
  }

  async logout(refreshTokenValue: string): Promise<void> {
    const tokenHash = this.deps.tokens.hashToken(refreshTokenValue)
    const session = await this.deps.repository.findSessionByHash(tokenHash)

    if (session && !session.revokedAt) {
      await this.deps.repository.revokeSession(session.id)
      this.deps.logger.info({ sessionId: session.id }, 'Session revoked')
    }
  }

  async getMe(userId: string): Promise<UserResponse> {
    const user = await this.deps.repository.findById(userId)
    if (!user) {
      throw new NotFoundError('User')
    }
    return toUserResponse(user)
  }

  async verifyEmail(token: string): Promise<void> {
    const tokenHash = this.deps.tokens.hashToken(token)
    const record = await this.deps.repository.findEmailVerificationToken(tokenHash)

    if (!record || record.consumedAt) {
      throw new TokenInvalidError('Verification token is invalid')
    }

    if (record.expiresAt < new Date()) {
      throw new TokenExpiredError('Verification token has expired')
    }

    await this.deps.repository.consumeEmailVerificationToken(record.id)
    await this.deps.repository.updateVerified(record.userId)

    this.deps.logger.info({ userId: record.userId }, 'Email verified')
  }

  async resendVerification(email: string): Promise<void> {
    const user = await this.deps.repository.findByEmail(email)
    if (!user) {
      return
    }

    if (user.verified) {
      return
    }

    await this.sendVerificationEmail(user)
  }

  async forgotPassword(input: ForgotPasswordInput): Promise<void> {
    const user = await this.deps.repository.findByEmail(input.email)
    if (!user) {
      return
    }

    const token = this.deps.tokens.generateOpaqueToken(32)
    const tokenHash = this.deps.tokens.hashToken(token)
    const expiresAt = new Date(Date.now() + PASSWORD_RESET_TOKEN_TTL_HOURS * 60 * 60 * 1000)

    await this.deps.repository.createPasswordResetToken(user.id, tokenHash, expiresAt)

    const resetUrl = `${env.APP_URL}/reset-password?token=${token}`
    const template = renderPasswordResetEmail({
      url: resetUrl,
      name: user.firstName ?? user.username,
    })

    await this.enqueueEmail({
      to: user.email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    })
  }

  async resetPassword(input: ResetPasswordInput): Promise<void> {
    const tokenHash = this.deps.tokens.hashToken(input.token)
    const record = await this.deps.repository.findPasswordResetToken(tokenHash)

    if (!record || record.consumedAt) {
      throw new TokenInvalidError('Reset token is invalid')
    }

    if (record.expiresAt < new Date()) {
      throw new TokenExpiredError('Reset token has expired')
    }

    const passwordHash = await this.deps.passwords.hash(input.password)
    await this.deps.repository.consumePasswordResetToken(record.id)
    await this.deps.repository.updatePassword(record.userId, passwordHash)
    await this.deps.repository.revokeAllSessions(record.userId)

    this.deps.logger.info({ userId: record.userId }, 'Password reset')
  }

  private async createSession(user: User, device: DeviceInfo): Promise<AuthResult> {
    const refresh = this.deps.tokens.createRefreshToken()

    const session = await this.deps.repository.createSession({
      userId: user.id,
      refreshTokenHash: refresh.hash,
      userAgent: device.userAgent,
      ipAddress: device.ipAddress,
      deviceName: device.deviceName,
      expiresAt: refresh.expiresAt,
    })

    const accessToken = this.deps.tokens.signAccessToken({
      sub: user.id,
      email: user.email,
      sessionId: session.id,
      type: 'access',
    })

    return {
      user: toUserResponse(user),
      accessToken,
      refreshTokenValue: refresh.value,
    }
  }

  private async sendVerificationEmail(user: User): Promise<void> {
    const token = this.deps.tokens.generateOpaqueToken(32)
    const tokenHash = this.deps.tokens.hashToken(token)
    const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_TTL_HOURS * 60 * 60 * 1000)

    await this.deps.repository.createEmailVerificationToken(user.id, tokenHash, expiresAt)

    const verifyUrl = `${env.APP_URL}/verify-email?token=${token}`
    const template = renderVerificationEmail({
      url: verifyUrl,
      name: user.firstName ?? user.username,
    })

    await this.enqueueEmail({
      to: user.email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    })
  }

  private async enqueueEmail(message: EmailMessage): Promise<void> {
    await this.deps.queue.enqueue('send-email', message, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    })
  }
}

export function createAuthService(deps: AuthServiceDependencies): AuthService {
  return new AuthService(deps)
}

export { toUserResponse, parseDeviceInfo }
