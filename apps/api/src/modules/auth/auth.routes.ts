import type { FastifyInstance } from 'fastify'
import type { AuthService } from './auth.service.js'
import { createAuthController } from './auth.controller.js'
import { authenticate } from './auth.guard.js'

export interface AuthModuleOptions {
  authService: AuthService
}

export async function registerAuthRoutes(app: FastifyInstance, options: AuthModuleOptions) {
  const controller = createAuthController(options.authService)

  app.post('/auth/register', controller.register)
  app.post('/auth/login', controller.login)
  app.post('/auth/refresh', controller.refresh)
  app.post('/auth/logout', controller.logout)
  app.post('/auth/verify-email', controller.verifyEmail)
  app.post('/auth/resend-verification', controller.resendVerification)
  app.post('/auth/forgot-password', controller.forgotPassword)
  app.post('/auth/reset-password', controller.resetPassword)
  app.get('/auth/me', { preHandler: [authenticate] }, controller.me)
}
