import pino from 'pino'
import crypto from 'node:crypto'
import type { FastifyBaseLogger, FastifyRequest } from 'fastify'
import { env, isDevelopment } from '../../config/env.js'

const REDACT_PATHS = [
  'req.headers.authorization',
  'req.headers.cookie',
  'req.headers["x-api-key"]',
  'res.headers["set-cookie"]',
  'password',
  'passwordHash',
  'password_hash',
  'token',
  'accessToken',
  'refreshToken',
  'refreshTokenValue',
]

export function createLogger(): pino.Logger {
  const baseOptions: pino.LoggerOptions = {
    level: env.LOG_LEVEL,
    redact: {
      paths: REDACT_PATHS,
      censor: '[redacted]',
    },
    base: {
      service: 'nexus-links-api',
      env: env.NODE_ENV,
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  }

  if (isDevelopment()) {
    return pino({
      ...baseOptions,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:HH:MM:ss',
          ignore: 'pid,hostname',
        },
      },
    })
  }

  return pino(baseOptions)
}

export function generateRequestId(): string {
  return crypto.randomUUID()
}

export function getCorrelationId(request: FastifyRequest): string {
  const header = request.headers['x-correlation-id']
  if (typeof header === 'string' && header.length > 0 && header.length <= 128) {
    return header
  }
  return crypto.randomUUID()
}

export type { FastifyBaseLogger }
