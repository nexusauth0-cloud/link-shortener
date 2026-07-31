export { AppError, type ErrorSeverity } from './app-error.js'
export {
  ValidationError,
  AuthenticationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  TokenExpiredError,
  TokenInvalidError,
  InvalidCredentialsError,
  EmailNotVerifiedError,
  DatabaseError,
  ServiceUnavailableError,
} from './http-errors.js'
export { ErrorCodes, type ErrorCode, type ErrorDetails } from './error-codes.js'
