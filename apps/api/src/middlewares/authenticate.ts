import type { FastifyRequest, FastifyReply } from 'fastify'
import { AppError } from '../errors/app-error.js'

export async function authenticate(request: FastifyRequest, _reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch {
    throw new AppError(401, 'UNAUTHORIZED', 'Invalid or expired token')
  }
}
