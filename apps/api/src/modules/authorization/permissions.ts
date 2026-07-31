export const Permissions = {
  LINK_CREATE: 'link:create',
  LINK_READ: 'link:read',
  LINK_UPDATE: 'link:update',
  LINK_DELETE: 'link:delete',
  LINK_MANAGE: 'link:manage',
  ANALYTICS_READ: 'analytics:read',
  TEAM_MANAGE: 'team:manage',
  BILLING_MANAGE: 'billing:manage',
  SETTINGS_MANAGE: 'settings:manage',
  API_MANAGE: 'api:manage',
} as const

export type Permission = (typeof Permissions)[keyof typeof Permissions]

export const ALL_PERMISSIONS: readonly Permission[] = Object.values(Permissions)
