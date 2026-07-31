import type { FastifyInstance } from 'fastify'
import { ServiceUnavailableError } from '../errors/index.js'

interface HealthDependencies {
  isDatabaseHealthy: () => Promise<boolean>
  isCacheHealthy: () => Promise<boolean>
  getUptimeSeconds: () => number
  getMemoryUsageBytes: () => number
  renderMetrics: () => string
}

interface HealthCheckResult {
  status: 'ok' | 'degraded' | 'down'
  uptimeSeconds: number
  memoryUsageBytes: number
  checks: {
    database: 'up' | 'down'
    cache: 'up' | 'down'
  }
  timestamp: string
}

export function registerHealthRoutes(app: FastifyInstance, deps: HealthDependencies) {
  app.get('/health/live', async () => ({
    status: 'ok',
    uptimeSeconds: deps.getUptimeSeconds(),
  }))

  app.get('/health/ready', async (_request, reply) => {
    const [databaseUp, cacheUp] = await Promise.all([
      deps.isDatabaseHealthy(),
      deps.isCacheHealthy(),
    ])

    const body: HealthCheckResult = {
      status: databaseUp && cacheUp ? 'ok' : databaseUp || cacheUp ? 'degraded' : 'down',
      uptimeSeconds: deps.getUptimeSeconds(),
      memoryUsageBytes: deps.getMemoryUsageBytes(),
      checks: {
        database: databaseUp ? 'up' : 'down',
        cache: cacheUp ? 'up' : 'down',
      },
      timestamp: new Date().toISOString(),
    }

    if (body.status !== 'ok') {
      reply.status(503)
    }

    return body
  })

  app.get('/health', async (_request, _reply) => {
    const [databaseUp, cacheUp] = await Promise.all([
      deps.isDatabaseHealthy(),
      deps.isCacheHealthy(),
    ])

    if (!databaseUp || !cacheUp) {
      throw new ServiceUnavailableError()
    }

    return {
      status: 'ok',
      uptimeSeconds: deps.getUptimeSeconds(),
      memoryUsageBytes: deps.getMemoryUsageBytes(),
      checks: {
        database: 'up',
        cache: 'up',
      },
      timestamp: new Date().toISOString(),
    }
  })

  app.get('/metrics', async (_request, reply) => {
    reply.type('text/plain; version=0.0.4; charset=utf-8')
    return deps.renderMetrics()
  })
}
