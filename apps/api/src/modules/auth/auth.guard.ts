import type { FastifyReply, FastifyRequest } from 'fastify'
import { TokenExpiredError, TokenInvalidError } from '../../core/errors/index.js'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      sub: string
      email: string
      sessionId: string
      type: 'access'
    }
    user: {
      sub: string
      email: string
      sessionId: string
      type: 'access'
    }
  }
}

export async function authenticate(request: FastifyRequest, _reply: FastifyReply) {
  try {
    await request.jwtVerify()
    request.userId = request.user.sub
    request.sessionId = request.user.sessionId
  } catch (error) {
    const err = error as { code?: string; name?: string }
    if (err.code === 'FAST_JWT_EXPIRED' || err.name === 'TokenExpiredError') {
      throw new TokenExpiredError()
    }
    throw new TokenInvalidError()
  }
}
