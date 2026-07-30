import type { FastifyInstance } from 'fastify'
import { env } from './config/env.js'
import { logger } from './plugins/logger.js'

export async function startServer(app: FastifyInstance) {
  try {
    await app.listen({ port: env.PORT, host: env.HOST })
    logger.info(`Server listening on ${env.HOST}:${env.PORT}`)
  } catch (err) {
    logger.error(err, 'Failed to start server')
    process.exit(1)
  }
}

export function setupShutdown(app: FastifyInstance) {
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Starting graceful shutdown...`)
    try {
      await app.close()
      logger.info('Server closed successfully')
      process.exit(0)
    } catch (err) {
      logger.error(err, 'Error during shutdown')
      process.exit(1)
    }
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}
