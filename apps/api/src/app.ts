import Fastify from 'fastify'
import type { FastifyBaseLogger, FastifyRequest } from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import cookie from '@fastify/cookie'
import jwt from '@fastify/jwt'

import { env } from './config/env.js'
import { createLogger, generateRequestId, getCorrelationId } from './core/logger/logger.service.js'
import { createPrismaClient } from './core/database/prisma.service.js'
import { registerErrorHandler } from './core/errors/error-handler.js'
import { RedisService } from './core/cache/redis.service.js'
import { CacheService } from './core/cache/cache.service.js'
import { QueueService, createQueueConnection } from './core/queue/queue.service.js'
import { EmailService, isEmailEnabled, type EmailMessage } from './core/email/email.service.js'
import { SmtpEmailProvider } from './core/email/providers/smtp.provider.js'
import { ConsoleEmailProvider } from './core/email/providers/console.provider.js'
import { createStorageProvider } from './core/storage/storage.module.js'
import { MetricsService } from './core/metrics/metrics.service.js'
import { registerHealthRoutes } from './core/metrics/health.routes.js'

import { TokenService } from './modules/auth/token.service.js'
import { PasswordService } from './modules/auth/password.service.js'
import { AuthRepository } from './modules/auth/auth.repository.js'
import { AuthService } from './modules/auth/auth.service.js'
import { registerAuthRoutes } from './modules/auth/auth.routes.js'
import {
  RbacRepository,
  RbacService,
  createPermissionGuard,
  createRoleGuard,
} from './modules/authorization/index.js'

declare module 'fastify' {
  interface FastifyInstance {
    rbac: RbacService
    requirePermission: ReturnType<typeof createPermissionGuard>
    requireRole: ReturnType<typeof createRoleGuard>
  }
}

const EMAIL_QUEUE_NAME = 'emails'
const EMAIL_JOB_NAME = 'send-email'

const requestStartTimes = new WeakMap<FastifyRequest, number>()

export async function buildApp() {
  const logger = createLogger()
  const metrics = new MetricsService()

  const app = Fastify({
    loggerInstance: logger as FastifyBaseLogger,
    genReqId: generateRequestId,
  })

  registerErrorHandler(app)

  await app.register(cors, {
    origin: env.CORS_ORIGINS.includes('*') ? true : env.CORS_ORIGINS,
    credentials: true,
  })

  await app.register(helmet)

  await app.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW_MS,
  })

  await app.register(cookie)

  await app.register(jwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: env.JWT_ACCESS_TOKEN_TTL },
  })

  app.addHook('onRequest', async (request) => {
    const correlationId = getCorrelationId(request)
    if (!request.headers['x-correlation-id']) {
      request.headers['x-correlation-id'] = correlationId
    }
    requestStartTimes.set(request, performance.now())
  })

  app.addHook('onResponse', async (request, reply) => {
    const startedAt = requestStartTimes.get(request)
    const durationMs = startedAt ? performance.now() - startedAt : 0
    metrics.recordRequest({
      method: request.method,
      route: request.routeOptions.url ?? request.url,
      statusCode: reply.statusCode,
      durationMs,
    })
    requestStartTimes.delete(request)
  })

  const prisma = createPrismaClient()
  const redis = new RedisService()
  await redis.connect()

  const cache = new CacheService({ redis: redis.raw, prefix: 'nexus' })

  let emailService: EmailService
  if (isEmailEnabled()) {
    emailService = new EmailService(new SmtpEmailProvider(logger), logger)
  } else {
    emailService = new EmailService(new ConsoleEmailProvider(logger), logger)
  }

  const emailQueue = new QueueService({
    connection: createQueueConnection(),
    queueName: EMAIL_QUEUE_NAME,
    handlers: {
      [EMAIL_JOB_NAME]: async (job) => {
        await emailService.send(job.data as EmailMessage)
      },
    },
  })

  const storage = createStorageProvider()
  logger.info({ driver: (storage as { name?: string }).name ?? 'unknown' }, 'Storage initialized')

  const tokenService = new TokenService(app)
  const passwordService = new PasswordService()
  const authRepository = new AuthRepository(prisma)
  const authService = new AuthService({
    repository: authRepository,
    tokens: tokenService,
    passwords: passwordService,
    queue: emailQueue,
    logger,
  })

  const rbacRepository = new RbacRepository(prisma)
  const rbacService = new RbacService(rbacRepository, cache, logger)
  app.decorate('rbac', rbacService)
  app.decorate('requirePermission', createPermissionGuard(rbacService))
  app.decorate('requireRole', createRoleGuard(rbacService))

  await registerHealthRoutes(app, {
    isDatabaseHealthy: async () => {
      try {
        await prisma.$queryRaw`SELECT 1`
        return true
      } catch {
        return false
      }
    },
    isCacheHealthy: async () => (await redis.ping()).status === 'up',
    getUptimeSeconds: () => metrics.getUptimeSeconds(),
    getMemoryUsageBytes: () => metrics.getMemoryUsageBytes(),
    renderMetrics: () => metrics.renderPrometheus(),
  })

  await app.register(
    async (scoped) => {
      await registerAuthRoutes(scoped, { authService })
    },
    { prefix: env.API_PREFIX },
  )

  app.log.info('Nexus Links API initialized')

  return {
    app,
    close: async () => {
      await emailQueue.close()
      await redis.disconnect()
      await prisma.$disconnect()
    },
  }
}
