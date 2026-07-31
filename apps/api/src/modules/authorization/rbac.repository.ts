import type { PrismaClient } from '@prisma/client'
import type { Permission } from './permissions.js'

export class RbacRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findPermissionsForUser(userId: string): Promise<Permission[]> {
    const roles = await this.prisma.userRole.findMany({
      where: { userId },
      select: {
        role: {
          select: {
            permissions: {
              select: { permission: { select: { name: true } } },
            },
          },
        },
      },
    })

    const permissions = new Set<Permission>()
    for (const { role } of roles) {
      for (const { permission } of role.permissions) {
        permissions.add(permission.name as Permission)
      }
    }
    return [...permissions]
  }

  async findRolesForUser(userId: string): Promise<string[]> {
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      select: { role: { select: { name: true } } },
    })
    return userRoles.map(({ role }) => role.name)
  }

  async findRoleByName(name: string) {
    return this.prisma.role.findUnique({
      where: { name },
      include: { permissions: { include: { permission: true } } },
    })
  }
}
