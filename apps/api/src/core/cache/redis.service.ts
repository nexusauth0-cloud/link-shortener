import Redis from 'ioredis'
import { env } from '../../config/env.js'
import { createLogger } from '../logger/logger.service.js'

const logger = createLogger()

export interface RedisHealth {
  status: 'up' | 'down'
  latencyMs?: number
  error?: string
}

export class RedisService {
  private readonly client: Redis
  private healthy = false

  constructor() {
    this.client = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: true,
      retryStrategy: (times) => Math.min(times * 200, 3000),
    })

    this.client.on('connect', () => {
      logger.info('Redis connected')
    })

    this.client.on('ready', () => {
      this.healthy = true
      logger.info('Redis ready')
    })

    this.client.on('close', () => {
      this.healthy = false
      logger.warn('Redis connection closed')
    })

    this.client.on('error', (error) => {
      this.healthy = false
      logger.error({ err: error }, 'Redis error')
    })
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect()
    } catch (error) {
      logger.error({ err: error }, 'Redis connection failed')
      throw error
    }
  }

  async ping(): Promise<RedisHealth> {
    const startedAt = performance.now()
    try {
      await this.client.ping()
      return { status: 'up', latencyMs: Math.round(performance.now() - startedAt) }
    } catch (error) {
      return {
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown redis error',
      }
    }
  }

  get raw(): Redis {
    return this.client
  }

  async disconnect(): Promise<void> {
    await this.client.quit()
  }

  get isHealthy(): boolean {
    return this.healthy
  }
}
