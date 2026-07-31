import type { FastifyInstance } from 'fastify'
import { env } from './config/env.js'

export async function startServer(app: FastifyInstance) {
  await app.listen({ port: env.PORT, host: env.HOST })
  app.log.info(`Server listening on ${env.HOST}:${env.PORT}`)
}

export function setupShutdown(app: FastifyInstance, closeDependencies: () => Promise<void>) {
  const shutdown = async (signal: string) => {
    app.log.info(`Received ${signal}. Starting graceful shutdown...`)
    try {
      await app.close()
      await closeDependencies()
      app.log.info('Server closed successfully')
      process.exit(0)
    } catch (err) {
      app.log.error({ err }, 'Error during shutdown')
      process.exit(1)
    }
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}
