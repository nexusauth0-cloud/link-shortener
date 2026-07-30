import type { FastifyRequest, FastifyReply } from 'fastify'
import type { AuthService } from '../services/auth.service.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'
import { AppError } from '../errors/app-error.js'
import { env } from '../config/env.js'

const REFRESH_COOKIE = 'refreshToken'
const REFRESH_PATH = '/api/v1/auth'

function setRefreshCookie(reply: FastifyReply, token: string, expiresAt: Date) {
  reply.setCookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: REFRESH_PATH,
    expires: expiresAt,
  })
}

function clearRefreshCookie(reply: FastifyReply) {
  reply.clearCookie(REFRESH_COOKIE, { path: REFRESH_PATH })
}

export function createAuthController(authService: AuthService) {
  async function register(request: FastifyRequest, reply: FastifyReply) {
    const parsed = registerSchema.safeParse(request.body)
    if (!parsed.success) {
      throw new AppError(400, 'VALIDATION_ERROR', 'Invalid input', parsed.error.issues)
    }

    const { user } = await authService.register(parsed.data)

    return reply.status(201).send({ success: true, data: user })
  }

  async function login(request: FastifyRequest, reply: FastifyReply) {
    const parsed = loginSchema.safeParse(request.body)
    if (!parsed.success) {
      throw new AppError(400, 'VALIDATION_ERROR', 'Invalid input', parsed.error.issues)
    }

    const { user, tokens, refreshTokenValue } = await authService.login(parsed.data)

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    setRefreshCookie(reply, refreshTokenValue, expiresAt)

    return reply.send({ success: true, data: { user, ...tokens } })
  }

  async function refresh(request: FastifyRequest, reply: FastifyReply) {
    const cookieToken = request.cookies[REFRESH_COOKIE]
    if (!cookieToken) {
      throw new AppError(401, 'UNAUTHORIZED', 'Refresh token not found')
    }

    const { user, tokens, refreshTokenValue } = await authService.refresh(cookieToken)

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    setRefreshCookie(reply, refreshTokenValue, expiresAt)

    return reply.send({ success: true, data: { user, ...tokens } })
  }

  async function logout(request: FastifyRequest, reply: FastifyReply) {
    const cookieToken = request.cookies[REFRESH_COOKIE]
    if (cookieToken) {
      await authService.logout(cookieToken)
    }

    clearRefreshCookie(reply)
    return reply.send({ success: true, data: { message: 'Logged out successfully' } })
  }

  async function me(request: FastifyRequest, reply: FastifyReply) {
    const payload = request.user
    const user = await authService.getMe(payload.id)

    return reply.send({ success: true, data: user })
  }

  return { register, login, refresh, logout, me }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string
      email: string
      username: string
    }
  }
}
