import { PrismaClient } from '@prisma/client'
import { env } from '../../config/env.js'
import { createLogger } from '../logger/logger.service.js'

const logger = createLogger()

function buildDatasourceUrl(): string {
  const url = new URL(env.DATABASE_URL)
  url.searchParams.set('connection_limit', String(env.DATABASE_POOL_MAX))
  url.searchParams.set('pool_timeout', '10')
  return url.toString()
}

export function createPrismaClient(): PrismaClient {
  const client = new PrismaClient({
    datasourceUrl: buildDatasourceUrl(),
    log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })

  client.$on('query' as never, (event: { duration: number }) => {
    logger.debug({ durationMs: event.duration }, 'Prisma query')
  })

  return client
}
