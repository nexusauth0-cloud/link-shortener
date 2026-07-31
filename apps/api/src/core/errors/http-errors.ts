import { AppError } from './app-error.js'
import { ErrorCodes } from './error-codes.js'

export class ValidationError extends AppError {
  constructor(message = 'Invalid input', details?: { field?: string; issues?: unknown[] }) {
    super(ErrorCodes.VALIDATION_ERROR, 400, message, { details })
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed', details?: { field?: string }) {
    super(ErrorCodes.AUTHENTICATION_ERROR, 401, message, { details })
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', details?: { field?: string }) {
    super(ErrorCodes.UNAUTHORIZED, 401, message, { details })
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', details?: { field?: string }) {
    super(ErrorCodes.FORBIDDEN, 403, message, { details })
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource', details?: { field?: string }) {
    super(ErrorCodes.NOT_FOUND, 404, `${resource} not found`, { details })
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict', details?: { field?: string }) {
    super(ErrorCodes.CONFLICT, 409, message, { details })
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests, please try again later') {
    super(ErrorCodes.RATE_LIMIT_EXCEEDED, 429, message)
  }
}

export class TokenExpiredError extends AppError {
  constructor(message = 'Token has expired') {
    super(ErrorCodes.TOKEN_EXPIRED, 401, message)
  }
}

export class TokenInvalidError extends AppError {
  constructor(message = 'Token is invalid') {
    super(ErrorCodes.TOKEN_INVALID, 401, message)
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message = 'Invalid email or password') {
    super(ErrorCodes.INVALID_CREDENTIALS, 401, message)
  }
}

export class EmailNotVerifiedError extends AppError {
  constructor(message = 'Email is not verified') {
    super(ErrorCodes.EMAIL_NOT_VERIFIED, 403, message)
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed', details?: { field?: string }) {
    super(ErrorCodes.DATABASE_ERROR, 500, message, {
      details,
      isOperational: false,
    })
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service is temporarily unavailable') {
    super(ErrorCodes.SERVICE_UNAVAILABLE, 503, message, {
      isOperational: false,
    })
  }
}
