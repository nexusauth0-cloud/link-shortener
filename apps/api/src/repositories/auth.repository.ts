import type { PrismaClient, User } from '@prisma/client'

export type UserCreateData = {
  email: string
  username: string
  passwordHash: string
  firstName?: string
  lastName?: string
}

export function createAuthRepository(prisma: PrismaClient) {
  function findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } })
  }

  function findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } })
  }

  function findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  function create(data: UserCreateData): Promise<User> {
    return prisma.user.create({ data })
  }

  function saveRefreshToken(tokenHash: string, userId: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: { tokenHash, userId, expiresAt },
    })
  }

  function findRefreshToken(tokenHash: string) {
    return prisma.refreshToken.findFirst({ where: { tokenHash } })
  }

  function deleteRefreshToken(tokenHash: string) {
    return prisma.refreshToken.deleteMany({ where: { tokenHash } })
  }

  function deleteUserRefreshTokens(userId: string) {
    return prisma.refreshToken.deleteMany({ where: { userId } })
  }

  return {
    findByEmail,
    findByUsername,
    findById,
    create,
    saveRefreshToken,
    findRefreshToken,
    deleteRefreshToken,
    deleteUserRefreshTokens,
  }
}

export type AuthRepository = ReturnType<typeof createAuthRepository>
