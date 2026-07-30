import type { FastifyInstance } from 'fastify'
import { healthRoutes } from './health.js'

export async function registerRoutes(app: FastifyInstance) {
  app.register(healthRoutes)
}
