import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Prisma } from '@prisma/client'
import { AppError, ConflictError, DatabaseError, NotFoundError, ValidationError } from './index.js'
import { env, isDevelopment } from '../../config/env.js'

function mapPrismaError(error: Prisma.PrismaClientKnownRequestError): AppError {
  switch (error.code) {
    case 'P2002':
      return new ConflictError('A record with this value already exists', {
        field: Array.isArray(error.meta?.target) ? error.meta.target.join(', ') : 'unique_field',
      })
    case 'P2003':
      return new ConflictError('Operation violates a foreign key constraint')
    case 'P2025':
      return new NotFoundError('Record', { field: 'id' })
    default:
      return new DatabaseError(`Database error (${error.code})`)
  }
}

function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return mapPrismaError(error)
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new ValidationError('Invalid database query')
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new DatabaseError('Database connection could not be established')
  }

  return new AppError('INTERNAL_SERVER_ERROR', 500, 'Internal server error', {
    cause: error instanceof Error ? error.message : undefined,
    isOperational: false,
  })
}

function isFastifyValidationError(error: FastifyError): boolean {
  return 'validation' in error && error.validation !== undefined
}

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    const appError = isFastifyValidationError(error)
      ? new ValidationError(error.message, { issues: error.validation })
      : toAppError(error)

    const requestContext = {
      method: request.method,
      url: request.url,
      requestId: request.id,
      correlationId: request.headers['x-correlation-id'],
    }

    if (!appError.isOperational) {
      request.log.error({ err: error, code: appError.code, ...requestContext }, 'Unhandled error')
    } else {
      request.log.warn(
        { code: appError.code, statusCode: appError.statusCode, ...requestContext },
        `Operational error: ${appError.message}`,
      )
    }

    const exposeDetails = appError.isOperational && isDevelopment()

    void reply.status(appError.statusCode).send({
      success: false,
      error: {
        code: appError.code,
        message: appError.message,
        ...(exposeDetails && appError.details ? { details: appError.details } : {}),
      },
    })
  })
}

export { env }
