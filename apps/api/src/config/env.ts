import { loadEnv, type Env } from './env.schema.js'

try {
  process.loadEnvFile()
} catch {
  // No .env file present; rely on the process environment.
}

export const env: Env = loadEnv()

export function isProduction(): boolean {
  return env.NODE_ENV === 'production'
}

export function isDevelopment(): boolean {
  return env.NODE_ENV === 'development'
}

export function isTest(): boolean {
  return env.NODE_ENV === 'test'
}
