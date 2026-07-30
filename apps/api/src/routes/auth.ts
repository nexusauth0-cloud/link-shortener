import type { FastifyInstance } from 'fastify'
import type { AuthService } from '../services/auth.service.js'
import { createAuthController } from '../controllers/auth.controller.js'
import { authenticate } from '../middlewares/authenticate.js'

export async function authRoutes(app: FastifyInstance, opts: { authService: AuthService }) {
  const { authService } = opts
  const controller = createAuthController(authService)

  const registerSchema = {
    body: {
      type: 'object',
      required: ['email', 'username', 'password'],
      properties: {
        email: { type: 'string', format: 'email' },
        username: { type: 'string', minLength: 3, maxLength: 30 },
        password: { type: 'string', minLength: 8, maxLength: 128 },
        firstName: { type: 'string', maxLength: 50 },
        lastName: { type: 'string', maxLength: 50 },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              email: { type: 'string' },
              username: { type: 'string' },
              firstName: { type: 'string', nullable: true },
              lastName: { type: 'string', nullable: true },
              avatar: { type: 'string', nullable: true },
              verified: { type: 'boolean' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
  }

  const loginSchema = {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: {
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  email: { type: 'string' },
                  username: { type: 'string' },
                  firstName: { type: 'string', nullable: true },
                  lastName: { type: 'string', nullable: true },
                  avatar: { type: 'string', nullable: true },
                  verified: { type: 'boolean' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
              accessToken: { type: 'string' },
            },
          },
        },
      },
    },
  }

  const meSchema = {
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              email: { type: 'string' },
              username: { type: 'string' },
              firstName: { type: 'string', nullable: true },
              lastName: { type: 'string', nullable: true },
              avatar: { type: 'string', nullable: true },
              verified: { type: 'boolean' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
  }

  app.post('/auth/register', { schema: registerSchema }, controller.register)
  app.post('/auth/login', { schema: loginSchema }, controller.login)
  app.post('/auth/logout', controller.logout)
  app.post('/auth/refresh', controller.refresh)
  app.get('/auth/me', { schema: meSchema, preHandler: [authenticate] }, controller.me)
}
