import Fastify from 'fastify'
import { logger } from './plugins/logger.js'
import prismaPlugin from './plugins/prisma.js'
import corsPlugin from './plugins/cors.js'
import helmetPlugin from './plugins/helmet.js'
import rateLimitPlugin from './plugins/rate-limit.js'
import swaggerPlugin from './plugins/swagger.js'
import { errorHandler } from './middlewares/error-handler.js'
import { authMiddleware } from './middlewares/auth.js'
import { registerRoutes } from './routes/index.js'

export async function buildApp() {
  const app = Fastify({
    logger,
  })

  errorHandler(app)
  authMiddleware(app)

  await app.register(prismaPlugin)
  await app.register(corsPlugin)
  await app.register(helmetPlugin)
  await app.register(rateLimitPlugin)
  await app.register(swaggerPlugin)

  await app.register(
    async (scoped) => {
      await registerRoutes(scoped)
    },
    { prefix: '/api/v1' },
  )

  return app
}
