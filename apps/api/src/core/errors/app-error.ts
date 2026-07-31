import type { ErrorCode, ErrorDetails } from './error-codes.js'

export type ErrorSeverity = 'fatal' | 'error' | 'warn' | 'info'

export class AppError extends Error {
  public readonly code: ErrorCode
  public readonly statusCode: number
  public readonly details?: ErrorDetails
  public readonly severity: ErrorSeverity
  public readonly isOperational: boolean

  constructor(
    code: ErrorCode,
    statusCode: number,
    message: string,
    options: {
      details?: ErrorDetails
      severity?: ErrorSeverity
      cause?: unknown
      isOperational?: boolean
    } = {},
  ) {
    super(message, options.cause ? { cause: options.cause } : undefined)
    this.name = new.target.name
    this.code = code
    this.statusCode = statusCode
    this.details = options.details
    this.severity = options.severity ?? (statusCode >= 500 ? 'error' : 'warn')
    this.isOperational = options.isOperational ?? statusCode < 500
  }
}
