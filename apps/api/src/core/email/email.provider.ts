import type { EmailMessage } from './email.service.js'

export interface EmailProvider {
  readonly name: string
  send(message: EmailMessage): Promise<void>
}
