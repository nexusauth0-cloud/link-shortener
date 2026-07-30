import * as argon2 from 'argon2'
import crypto from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import type { AuthRepository } from '../repositories/auth.repository.js'
import { AppError } from '../errors/app-error.js'
import type { RegisterInput, LoginInput } from '../schemas/auth.schema.js'
import type { AuthTokens, JwtPayload, UserResponse } from '../types/index.js'

const ACCESS_TOKEN_EXPIRY = '15m'
const REFRESH_TOKEN_EXPIRY_DAYS = 7

function toUserResponse(user: { id: string; email: string; username: string; firstName: string | null; lastName: string | null; avatar: string | null; verified: boolean; createdAt: Date; updatedAt: Date }): UserResponse {
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

function generateRefreshToken(): string {
  return crypto.randomBytes(48).toString('hex')
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export function createAuthService(app: FastifyInstance, authRepository: AuthRepository) {
  async function register(input: RegisterInput): Promise<{ user: UserResponse }> {
    const existingEmail = await authRepository.findByEmail(input.email)
    if (existingEmail) {
      throw new AppError(409, 'CONFLICT', 'Email is already registered')
    }

    const existingUsername = await authRepository.findByUsername(input.username)
    if (existingUsername) {
      throw new AppError(409, 'CONFLICT', 'Username is already taken')
    }

    const passwordHash = await argon2.hash(input.password)

    const user = await authRepository.create({
      email: input.email,
      username: input.username,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
    })

    return { user: toUserResponse(user) }
  }

  async function login(
    input: LoginInput,
  ): Promise<{ user: UserResponse; tokens: AuthTokens; refreshTokenValue: string }> {
    const user = await authRepository.findByEmail(input.email)
    if (!user) {
      throw new AppError(401, 'UNAUTHORIZED', 'Invalid email or password')
    }

    const valid = await argon2.verify(user.passwordHash, input.password)
    if (!valid) {
      throw new AppError(401, 'UNAUTHORIZED', 'Invalid email or password')
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    const accessToken = app.jwt.sign(payload, { expiresIn: ACCESS_TOKEN_EXPIRY })

    const refreshTokenValue = generateRefreshToken()
    const tokenHash = hashToken(refreshTokenValue)
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)

    await authRepository.saveRefreshToken(tokenHash, user.id, expiresAt)

    return { user: toUserResponse(user), tokens: { accessToken }, refreshTokenValue }
  }

  async function refresh(
    cookieToken: string,
  ): Promise<{ user: UserResponse; tokens: AuthTokens; refreshTokenValue: string }> {
    const tokenHash = hashToken(cookieToken)
    const storedToken = await authRepository.findRefreshToken(tokenHash)

    if (!storedToken) {
      throw new AppError(401, 'UNAUTHORIZED', 'Invalid refresh token')
    }

    if (storedToken.expiresAt < new Date()) {
      await authRepository.deleteRefreshToken(tokenHash)
      throw new AppError(401, 'UNAUTHORIZED', 'Refresh token expired')
    }

    const user = await authRepository.findById(storedToken.userId)
    if (!user) {
      await authRepository.deleteRefreshToken(tokenHash)
      throw new AppError(401, 'UNAUTHORIZED', 'User not found')
    }

    await authRepository.deleteRefreshToken(tokenHash)

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    const accessToken = app.jwt.sign(payload, { expiresIn: ACCESS_TOKEN_EXPIRY })

    const newRefreshTokenValue = generateRefreshToken()
    const newTokenHash = hashToken(newRefreshTokenValue)
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)

    await authRepository.saveRefreshToken(newTokenHash, user.id, expiresAt)

    return {
      user: toUserResponse(user),
      tokens: { accessToken },
      refreshTokenValue: newRefreshTokenValue,
    }
  }

  async function logout(cookieToken: string): Promise<void> {
    const tokenHash = hashToken(cookieToken)
    await authRepository.deleteRefreshToken(tokenHash)
  }

  async function getMe(userId: string): Promise<UserResponse> {
    const user = await authRepository.findById(userId)
    if (!user) {
      throw new AppError(404, 'NOT_FOUND', 'User not found')
    }
    return toUserResponse(user)
  }

  return { register, login, refresh, logout, getMe }
}

export type AuthService = ReturnType<typeof createAuthService>
