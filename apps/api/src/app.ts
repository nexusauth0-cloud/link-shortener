import Fastify from 'fastify'
import { logger } from './plugins/logger.js'
import prismaPlugin from './plugins/prisma.js'
import corsPlugin from './plugins/cors.js'
import helmetPlugin from './plugins/helmet.js'
import rateLimitPlugin from './plugins/rate-limit.js'
import swaggerPlugin from './plugins/swagger.js'
import { errorHandler } from './middlewares/error-handler.js'
import { authPlugin } from './middlewares/auth.js'
import { registerRoutes } from './routes/index.js'
import { createAuthRepository } from './repositories/auth.repository.js'
import { createAuthService } from './services/auth.service.js'

export async function buildApp() {
  const app = Fastify({
    logger,
  })

  errorHandler(app)

  await app.register(prismaPlugin)
  await app.register(corsPlugin)
  await app.register(helmetPlugin)
  await app.register(rateLimitPlugin)
  await app.register(swaggerPlugin)
  await app.register(authPlugin)

  const authRepository = createAuthRepository(app.prisma)
  const authService = createAuthService(app, authRepository)

  await app.register(
    async (scoped) => {
      await registerRoutes(scoped, authService)
    },
    { prefix: '/api/v1' },
  )

  return app
}
