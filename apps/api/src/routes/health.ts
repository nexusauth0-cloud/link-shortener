import type { FastifyInstance } from 'fastify'
import { getHealth } from '../controllers/health.controller.js'
import { healthResponseSchema } from '../schemas/health.schema.js'

export async function healthRoutes(app: FastifyInstance) {
  app.get('/health', { schema: healthResponseSchema }, async (_request, _reply) => {
    return getHealth()
  })
}
