import type {
  Prisma,
  PrismaClient,
  User,
  Session,
  EmailVerificationToken,
  PasswordResetToken,
} from '@prisma/client'
import { activeWhere } from '../../core/database/soft-delete.extension.js'

export interface UserCreateData {
  email: string
  username: string
  passwordHash: string
  firstName?: string
  lastName?: string
}

export interface SessionCreateData {
  userId: string
  refreshTokenHash: string
  userAgent?: string
  ipAddress?: string
  deviceName?: string
  expiresAt: Date
}

export class AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } })
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } })
  }

  create(data: UserCreateData): Promise<User> {
    return this.prisma.user.create({ data })
  }

  updateVerified(userId: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { verified: true },
    })
  }

  updateLastLogin(userId: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    })
  }

  updatePassword(userId: string, passwordHash: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    })
  }

  findSessionByHash(tokenHash: string): Promise<Session | null> {
    return this.prisma.session.findUnique({ where: { refreshTokenHash: tokenHash } })
  }

  createSession(data: SessionCreateData): Promise<Session> {
    return this.prisma.session.create({ data })
  }

  updateSessionLastUsed(sessionId: string): Promise<Session> {
    return this.prisma.session.update({
      where: { id: sessionId },
      data: { lastUsedAt: new Date() },
    })
  }

  revokeSession(sessionId: string): Promise<Session> {
    return this.prisma.session.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    })
  }

  revokeAllSessions(userId: string): Promise<Prisma.BatchPayload> {
    return this.prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    })
  }

  rotateSession(oldSessionId: string, newTokenHash: string, expiresAt: Date): Promise<Session> {
    return this.prisma.session.update({
      where: { id: oldSessionId },
      data: {
        refreshTokenHash: newTokenHash,
        expiresAt,
        lastUsedAt: new Date(),
      },
    })
  }

  createEmailVerificationToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<EmailVerificationToken> {
    return this.prisma.emailVerificationToken.create({
      data: { userId, tokenHash, expiresAt },
    })
  }

  findEmailVerificationToken(tokenHash: string): Promise<EmailVerificationToken | null> {
    return this.prisma.emailVerificationToken.findUnique({
      where: { tokenHash },
    })
  }

  consumeEmailVerificationToken(tokenId: string): Promise<EmailVerificationToken> {
    return this.prisma.emailVerificationToken.update({
      where: { id: tokenId },
      data: { consumedAt: new Date() },
    })
  }

  createPasswordResetToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<PasswordResetToken> {
    return this.prisma.passwordResetToken.create({
      data: { userId, tokenHash, expiresAt },
    })
  }

  findPasswordResetToken(tokenHash: string): Promise<PasswordResetToken | null> {
    return this.prisma.passwordResetToken.findUnique({ where: { tokenHash } })
  }

  consumePasswordResetToken(tokenId: string): Promise<PasswordResetToken> {
    return this.prisma.passwordResetToken.update({
      where: { id: tokenId },
      data: { consumedAt: new Date() },
    })
  }

  async findActiveUser(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { id, ...activeWhere },
    })
  }
}
