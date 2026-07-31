import nodemailer from 'nodemailer'
import type { FastifyBaseLogger } from 'fastify'
import { env } from '../../../config/env.js'
import { createLogger } from '../../logger/logger.service.js'
import type { EmailProvider } from '../email.provider.js'
import type { EmailMessage } from '../email.service.js'

export class SmtpEmailProvider implements EmailProvider {
  readonly name = 'smtp'

  private readonly transporter: nodemailer.Transporter
  private readonly from: string

  constructor(logger: FastifyBaseLogger = createLogger()) {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth:
        env.SMTP_USER && env.SMTP_PASS ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
      logger: false,
    })
    this.from = env.SMTP_FROM
    logger.info(
      { host: env.SMTP_HOST, port: env.SMTP_PORT, from: this.from },
      'SMTP email provider initialized',
    )
  }

  async send(message: EmailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    })
  }
}
