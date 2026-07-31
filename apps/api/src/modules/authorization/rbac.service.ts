import type { FastifyBaseLogger } from 'fastify'
import type { CacheService } from '../../core/cache/cache.service.js'
import type { RbacRepository } from './rbac.repository.js'
import type { Permission } from './permissions.js'

const RBAC_CACHE_TTL_SECONDS = 60

export class RbacService {
  constructor(
    private readonly repository: RbacRepository,
    private readonly cache: CacheService,
    private readonly logger: FastifyBaseLogger,
  ) {}

  private permissionCacheKey(userId: string): string {
    return `rbac:permissions:${userId}`
  }

  async getPermissions(userId: string): Promise<Permission[]> {
    const cacheKey = this.permissionCacheKey(userId)
    const cached = await this.cache.get<Permission[]>(cacheKey)
    if (cached) return cached

    const permissions = await this.repository.findPermissionsForUser(userId)
    await this.cache.set(cacheKey, permissions, RBAC_CACHE_TTL_SECONDS)
    return permissions
  }

  private roleCacheKey(userId: string): string {
    return `rbac:roles:${userId}`
  }

  async getRoles(userId: string): Promise<string[]> {
    const cacheKey = this.roleCacheKey(userId)
    const cached = await this.cache.get<string[]>(cacheKey)
    if (cached) return cached

    const roles = await this.repository.findRolesForUser(userId)
    await this.cache.set(cacheKey, roles, RBAC_CACHE_TTL_SECONDS)
    return roles
  }

  async hasPermission(userId: string, permission: Permission): Promise<boolean> {
    try {
      const permissions = await this.getPermissions(userId)
      return permissions.includes(permission)
    } catch (error) {
      this.logger.error({ err: error, userId, permission }, 'RBAC permission check failed')
      return false
    }
  }

  async invalidateCache(userId: string): Promise<void> {
    await this.cache.delete(this.permissionCacheKey(userId))
    await this.cache.delete(this.roleCacheKey(userId))
  }
}
