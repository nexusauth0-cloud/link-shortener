import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import type { AuthService } from './auth.service.js'
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resendVerificationSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from './auth.schemas.js'
import { ValidationError } from '../../core/errors/index.js'
import { env } from '../../config/env.js'
import type { DeviceInfo } from './device-info.js'
import { parseDeviceInfo } from './device-info.js'

const REFRESH_COOKIE_NAME = 'nexus_refresh'
const REFRESH_COOKIE_PATH = '/api/v1/auth'

function getDeviceInfo(request: FastifyRequest): DeviceInfo {
  return parseDeviceInfo(request.headers['user-agent'], request.ip)
}

function setRefreshCookie(reply: FastifyReply, token: string, maxAgeSeconds: number) {
  reply.setCookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'strict',
    path: REFRESH_COOKIE_PATH,
    maxAge: maxAgeSeconds,
  })
}

function clearRefreshCookie(reply: FastifyReply) {
  reply.clearCookie(REFRESH_COOKIE_NAME, { path: REFRESH_COOKIE_PATH })
}

function parseBody<T extends z.ZodTypeAny>(schema: T, body: unknown): z.infer<T> {
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    throw new ValidationError('Invalid input', { issues: parsed.error.issues })
  }
  return parsed.data
}

export function createAuthController(authService: AuthService) {
  async function register(request: FastifyRequest, reply: FastifyReply) {
    const input = parseBody(registerSchema, request.body)
    const user = await authService.register(input)
    return reply.status(201).send({ success: true, data: user })
  }

  async function login(request: FastifyRequest, reply: FastifyReply) {
    const input = parseBody(loginSchema, request.body)
    const device = getDeviceInfo(request)
    const result = await authService.login(input, device)

    const refreshMaxAge = env.JWT_REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60
    setRefreshCookie(reply, result.refreshTokenValue, refreshMaxAge)

    return reply.send({
      success: true,
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    })
  }

  async function refresh(request: FastifyRequest, reply: FastifyReply) {
    const refreshTokenValue = request.cookies[REFRESH_COOKIE_NAME]
    if (!refreshTokenValue) {
      throw new ValidationError('Refresh token not found')
    }

    const device = getDeviceInfo(request)
    const result = await authService.refresh(refreshTokenValue, device)

    const refreshMaxAge = env.JWT_REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60
    setRefreshCookie(reply, result.refreshTokenValue, refreshMaxAge)

    return reply.send({
      success: true,
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    })
  }

  async function logout(request: FastifyRequest, reply: FastifyReply) {
    const refreshTokenValue = request.cookies[REFRESH_COOKIE_NAME]
    if (refreshTokenValue) {
      await authService.logout(refreshTokenValue)
    }
    clearRefreshCookie(reply)
    return reply.send({ success: true, data: { message: 'Logged out successfully' } })
  }

  async function me(request: FastifyRequest, reply: FastifyReply) {
    const user = await authService.getMe(request.user.sub)
    return reply.send({ success: true, data: user })
  }

  async function verifyEmail(request: FastifyRequest, reply: FastifyReply) {
    const input = parseBody(verifyEmailSchema, request.body)
    await authService.verifyEmail(input.token)
    return reply.send({ success: true, data: { message: 'Email verified successfully' } })
  }

  async function resendVerification(request: FastifyRequest, reply: FastifyReply) {
    const input = parseBody(resendVerificationSchema, request.body)
    await authService.resendVerification(input.email)
    return reply.send({
      success: true,
      data: { message: 'If the email exists, a verification link has been sent' },
    })
  }

  async function forgotPassword(request: FastifyRequest, reply: FastifyReply) {
    const input = parseBody(forgotPasswordSchema, request.body)
    await authService.forgotPassword(input)
    return reply.send({
      success: true,
      data: { message: 'If the email exists, a reset link has been sent' },
    })
  }

  async function resetPassword(request: FastifyRequest, reply: FastifyReply) {
    const input = parseBody(resetPasswordSchema, request.body)
    await authService.resetPassword(input)
    return reply.send({ success: true, data: { message: 'Password reset successfully' } })
  }

  return {
    register,
    login,
    refresh,
    logout,
    me,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
  }
}
