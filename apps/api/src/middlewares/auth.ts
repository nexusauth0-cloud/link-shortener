import fjwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import type { FastifyInstance } from 'fastify'
import { env } from '../config/env.js'
import type { JwtPayload } from '../types/index.js'

export async function authPlugin(app: FastifyInstance) {
  await app.register(fjwt, {
    secret: env.JWT_SECRET,
    sign: { algorithm: 'HS256' },
  })

  await app.register(cookie)
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtPayload
    user: JwtPayload
  }
}
