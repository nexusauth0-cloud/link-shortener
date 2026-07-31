import type { FastifyBaseLogger } from 'fastify'
import { env } from '../../config/env.js'
import { createLogger } from '../logger/logger.service.js'
import type { EmailProvider } from './email.provider.js'

export interface EmailMessage {
  to: string
  subject: string
  text: string
  html?: string
}

export interface EmailTemplate {
  subject: string
  text: string
  html: string
}

export class EmailService {
  private readonly provider: EmailProvider
  private readonly logger: FastifyBaseLogger

  constructor(provider: EmailProvider, logger: FastifyBaseLogger = createLogger()) {
    this.provider = provider
    this.logger = logger
  }

  async send(message: EmailMessage): Promise<void> {
    try {
      await this.provider.send(message)
      this.logger.info({ to: message.to, subject: message.subject }, 'Email sent')
    } catch (error) {
      this.logger.error({ err: error, to: message.to }, 'Email send failed')
      throw error
    }
  }
}

export function isEmailEnabled(): boolean {
  return env.EMAIL_ENABLED && Boolean(env.SMTP_HOST)
}
