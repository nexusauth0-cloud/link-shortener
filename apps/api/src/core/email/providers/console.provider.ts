import type { FastifyBaseLogger } from 'fastify'
import { createLogger } from '../../logger/logger.service.js'
import type { EmailProvider } from '../email.provider.js'
import type { EmailMessage } from '../email.service.js'

export class ConsoleEmailProvider implements EmailProvider {
  readonly name = 'console'

  private readonly logger: FastifyBaseLogger

  constructor(logger: FastifyBaseLogger = createLogger()) {
    this.logger = logger
  }

  async send(message: EmailMessage): Promise<void> {
    this.logger.info(
      {
        to: message.to,
        subject: message.subject,
        text: message.text,
      },
      '[DEV] Email preview',
    )
  }
}
