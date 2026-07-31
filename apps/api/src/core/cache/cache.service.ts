import type Redis from 'ioredis'
import { createLogger } from '../logger/logger.service.js'

const logger = createLogger()

const DEFAULT_TTL_SECONDS = 60

export interface CacheServiceOptions {
  redis: Redis
  prefix: string
}

export class CacheService {
  private readonly redis: Redis
  private readonly prefix: string

  constructor(options: CacheServiceOptions) {
    this.redis = options.redis
    this.prefix = options.prefix
  }

  private key(key: string): string {
    return `${this.prefix}:${key}`
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = await this.redis.get(this.key(key))
      if (raw === null) return null
      return JSON.parse(raw) as T
    } catch (error) {
      logger.error({ err: error, key }, 'Cache get failed')
      return null
    }
  }

  async set<T>(key: string, value: T, ttlSeconds = DEFAULT_TTL_SECONDS): Promise<void> {
    try {
      await this.redis.set(this.key(key), JSON.stringify(value), 'EX', ttlSeconds)
    } catch (error) {
      logger.error({ err: error, key }, 'Cache set failed')
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(this.key(key))
    } catch (error) {
      logger.error({ err: error, key }, 'Cache delete failed')
    }
  }

  async deleteByPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(this.key(pattern))
      if (keys.length > 0) {
        await this.redis.del(...keys)
      }
    } catch (error) {
      logger.error({ err: error, pattern }, 'Cache pattern delete failed')
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      return (await this.redis.exists(this.key(key))) === 1
    } catch (error) {
      logger.error({ err: error, key }, 'Cache exists failed')
      return false
    }
  }

  async increment(key: string, by = 1, ttlSeconds?: number): Promise<number> {
    const fullKey = this.key(key)
    try {
      const value = await this.redis.incrby(fullKey, by)
      if (ttlSeconds) {
        await this.redis.expire(fullKey, ttlSeconds)
      }
      return value
    } catch (error) {
      logger.error({ err: error, key }, 'Cache increment failed')
      return 0
    }
  }
}
