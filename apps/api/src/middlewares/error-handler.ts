import type { FastifyInstance } from 'fastify'
import { AppError } from '../errors/app-error.js'
import type { ApiErrorResponse } from '../types/index.js'
import { env } from '../config/env.js'

interface ErrorWithStatus {
  statusCode?: number
  validation?: unknown
  message: string
}

const defaultErrorResponse: ApiErrorResponse = {
  success: false,
  error: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong',
  },
}

export function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: ErrorWithStatus, _request, reply) => {
    if (error instanceof AppError) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      }
      return reply.status(error.statusCode).send(response)
    }

    if (error.statusCode === 429) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please try again later.',
        },
      }
      return reply.status(429).send(response)
    }

    if (error.validation) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.message,
          details: error.validation,
        },
      }
      return reply.status(400).send(response)
    }

    if (env.NODE_ENV !== 'production') {
      app.log.error(error)
    }

    return reply.status(500).send(defaultErrorResponse)
  })
}
