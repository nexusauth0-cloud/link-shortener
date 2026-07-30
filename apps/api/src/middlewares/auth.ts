import type { FastifyInstance } from 'fastify'

export function authMiddleware(app: FastifyInstance) {
  app.decorate('authenticate', async () => {
    // Authentication will be implemented in a future milestone
  })
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: () => Promise<void>
  }
}
