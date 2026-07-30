import { env } from '../config/env.js'
import pkg from '../../package.json' with { type: 'json' }

const { version } = pkg

interface HealthResponse {
  status: 'ok'
  service: string
  version: string
  environment: string
  uptime: number
  timestamp: string
}

export function getHealth(): HealthResponse {
  return {
    status: 'ok',
    service: 'nexus-links-api',
    version,
    environment: env.NODE_ENV,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  }
}
