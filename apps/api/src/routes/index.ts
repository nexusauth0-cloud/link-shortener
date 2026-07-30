import type { FastifyInstance } from 'fastify'
import type { AuthService } from '../services/auth.service.js'
import { healthRoutes } from './health.js'
import { authRoutes } from './auth.js'

export async function registerRoutes(app: FastifyInstance, authService?: AuthService) {
  app.register(healthRoutes)

  if (authService) {
    await app.register(authRoutes, { authService })
  }
}
