import crypto from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import { env } from '../../config/env.js'
import { TokenInvalidError } from '../../core/errors/index.js'

export interface AccessTokenPayload {
  sub: string
  email: string
  sessionId: string
  type: 'access'
}

export interface RefreshTokenRecord {
  value: string
  hash: string
  expiresAt: Date
}

export class TokenService {
  constructor(private readonly app: FastifyInstance) {}

  signAccessToken(payload: AccessTokenPayload): string {
    return this.app.jwt.sign(
      {
        sub: payload.sub,
        email: payload.email,
        sessionId: payload.sessionId,
        type: 'access',
      },
      {
        expiresIn: env.JWT_ACCESS_TOKEN_TTL,
        iss: env.JWT_ISSUER,
        aud: env.JWT_AUDIENCE,
      },
    )
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    const decoded = this.app.jwt.verify<AccessTokenPayload>(token)
    if (decoded.type !== 'access') {
      throw new TokenInvalidError('Token type is invalid')
    }
    return decoded
  }

  isExpiredError(error: unknown): boolean {
    const err = error as { code?: string; name?: string }
    return err.code === 'FAST_JWT_EXPIRED' || err.name === 'TokenExpiredError'
  }

  generateOpaqueToken(byteLength = 48): string {
    return crypto.randomBytes(byteLength).toString('hex')
  }

  hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex')
  }

  createRefreshToken(): RefreshTokenRecord {
    const value = this.generateOpaqueToken(48)
    const expiresAt = new Date(Date.now() + env.JWT_REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000)
    return { value, hash: this.hashToken(value), expiresAt }
  }
}
