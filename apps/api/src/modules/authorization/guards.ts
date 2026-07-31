import type { FastifyReply, FastifyRequest } from 'fastify'
import { ForbiddenError } from '../../core/errors/index.js'
import type { Permission } from './permissions.js'
import type { RbacService } from './rbac.service.js'

declare module 'fastify' {
  interface FastifyRequest {
    userId: string
    sessionId: string
  }
}

export function createPermissionGuard(rbacService: RbacService) {
  return function requirePermission(permission: Permission) {
    return async function guard(request: FastifyRequest, _reply: FastifyReply) {
      const hasPermission = await rbacService.hasPermission(request.userId, permission)
      if (!hasPermission) {
        throw new ForbiddenError(`Missing required permission: ${permission}`)
      }
    }
  }
}

export function createRoleGuard(rbacService: RbacService) {
  return function requireRole(roles: readonly string[]) {
    return async function guard(request: FastifyRequest, _reply: FastifyReply) {
      const userRoles = await rbacService.getRoles(request.userId)
      const hasRole = userRoles.some((role) => roles.includes(role))
      if (!hasRole) {
        throw new ForbiddenError(`Missing required role: ${roles.join(', ')}`)
      }
    }
  }
}
