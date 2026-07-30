export type ErrorCode =
  | 'INTERNAL_SERVER_ERROR'
  | 'NOT_FOUND'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMIT_EXCEEDED'
  | 'CONFLICT'

export interface ApiErrorResponse {
  success: false
  error: {
    code: ErrorCode
    message: string
    details?: unknown
  }
}

export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export interface JwtPayload {
  id: string
  email: string
  username: string
}

export interface UserResponse {
  id: string
  email: string
  username: string
  firstName: string | null
  lastName: string | null
  avatar: string | null
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthTokens {
  accessToken: string
}
