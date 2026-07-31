import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'
import { env } from './seed-env.js'

const prisma = new PrismaClient()

const PERMISSIONS = [
  { name: 'link:create', description: 'Create short links' },
  { name: 'link:read', description: 'View short links' },
  { name: 'link:update', description: 'Update short links' },
  { name: 'link:delete', description: 'Delete short links' },
  { name: 'link:manage', description: 'Full management of links' },
  { name: 'analytics:read', description: 'View analytics data' },
  { name: 'team:manage', description: 'Manage team members' },
  { name: 'billing:manage', description: 'Manage billing and plans' },
  { name: 'settings:manage', description: 'Manage workspace settings' },
  { name: 'api:manage', description: 'Manage API keys and webhooks' },
]

const ROLES: { name: string; description: string; permissions: string[] }[] = [
  {
    name: 'OWNER',
    description: 'Full platform access',
    permissions: PERMISSIONS.map((p) => p.name),
  },
  {
    name: 'ADMIN',
    description: 'Administrative access',
    permissions: PERMISSIONS.map((p) => p.name),
  },
  {
    name: 'EDITOR',
    description: 'Can create and edit links',
    permissions: ['link:create', 'link:read', 'link:update', 'analytics:read'],
  },
  {
    name: 'VIEWER',
    description: 'Read-only access',
    permissions: ['link:read', 'analytics:read'],
  },
]

async function main() {
  console.log('Seeding database...')

  const permissionIds = new Map<string, string>()

  for (const permission of PERMISSIONS) {
    const record = await prisma.permission.upsert({
      where: { name: permission.name },
      update: { description: permission.description },
      create: permission,
    })
    permissionIds.set(permission.name, record.id)
  }
  console.log(`  ✔ ${PERMISSIONS.length} permissions`)

  for (const role of ROLES) {
    const record = await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description, isSystem: true },
      create: { name: role.name, description: role.description, isSystem: true },
    })

    await prisma.rolePermission.deleteMany({ where: { roleId: record.id } })
    for (const permissionName of role.permissions) {
      const permissionId = permissionIds.get(permissionName)
      if (!permissionId) continue
      await prisma.rolePermission.create({
        data: { roleId: record.id, permissionId },
      })
    }
  }
  console.log(`  ✔ ${ROLES.length} roles`)

  if (env.SEED_ADMIN_EMAIL && env.SEED_ADMIN_PASSWORD) {
    const passwordHash = await argon2.hash(env.SEED_ADMIN_PASSWORD)
    const admin = await prisma.user.upsert({
      where: { email: env.SEED_ADMIN_EMAIL },
      update: { passwordHash },
      create: {
        email: env.SEED_ADMIN_EMAIL,
        username: env.SEED_ADMIN_USERNAME,
        passwordHash,
        firstName: 'Nexus',
        lastName: 'Admin',
        verified: true,
      },
    })

    const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } })
    if (adminRole) {
      await prisma.userRole.upsert({
        where: { userId_roleId: { userId: admin.id, roleId: adminRole.id } },
        update: {},
        create: { userId: admin.id, roleId: adminRole.id },
      })
    }
    console.log(`  ✔ Admin user: ${env.SEED_ADMIN_EMAIL}`)
  }

  console.log('Seeding complete.')
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
