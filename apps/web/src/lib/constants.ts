export const APP_NAME = 'Nexus Links'
export const APP_SHORT_NAME = 'Nexus'
export const DEFAULT_REDIRECT = '/app'
export const LOGIN_PATH = '/login'
export const AUTH_TOKEN_KEY = 'nx_access_token'
export const REFRESH_TOKEN_KEY = 'nx_refresh_token'

export const PLAN_LIMITS = {
  free: { links: 100, clicks: 1000, domains: 1, members: 1 },
  pro: { links: 10000, clicks: 100000, domains: 10, members: 3 },
  business: { links: Infinity, clicks: 1_000_000, domains: 50, members: 20 },
  enterprise: { links: Infinity, clicks: Infinity, domains: Infinity, members: Infinity },
} as const

export const ROUTES = {
  landing: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  twoFactor: '/2fa',
  invite: '/invite/:token',
  authSuccess: '/auth/success',
  authError: '/auth/error',
  dashboard: '/app',
  links: '/app/links',
  analytics: '/app/analytics',
  qrStudio: '/app/qr-studio',
  bioLinks: '/app/bio-links',
  domains: '/app/domains',
  developerHub: '/app/api',
  workspace: '/app/teams',
  billing: '/app/billing',
  settings: '/app/settings',
  help: '/app/help',
  support: '/app/support',
} as const

export const PLANS = ['free', 'pro', 'business', 'enterprise'] as const
export type Plan = (typeof PLANS)[number]

export const TOAST_DURATION = 3000
export const SIMULATED_DELAY = 800
