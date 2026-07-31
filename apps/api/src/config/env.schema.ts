import { z } from 'zod'

const booleanFromString = z
  .enum(['true', 'false'])
  .default('false')
  .transform((v) => v === 'true')

const numberFromString = (defaultValue: number) => z.coerce.number().default(defaultValue)

const optionalString = z.preprocess(
  (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
  z.string().optional(),
)

export const envSchema = z.object({
  // --- App ---
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  PORT: numberFromString(3001),
  HOST: z.string().default('0.0.0.0'),
  API_PREFIX: z.string().default('/api/v1'),
  APP_URL: z.string().url().default('http://localhost:3001'),
  CORS_ORIGINS: z
    .string()
    .default('')
    .transform((v) => (v ? v.split(',').map((s) => s.trim()) : ['*'])),
  TRUST_PROXY: booleanFromString,

  // --- Database ---
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DATABASE_POOL_MIN: z.coerce.number().int().min(0).default(0),
  DATABASE_POOL_MAX: z.coerce.number().int().min(1).default(10),

  // --- Redis ---
  REDIS_URL: z.string().url('REDIS_URL must be a valid URL').default('redis://localhost:6379'),

  // --- JWT ---
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_ACCESS_TOKEN_TTL: z.string().default('15m'),
  JWT_REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().min(1).max(90).default(7),
  JWT_ISSUER: z.string().default('nexuslinks'),
  JWT_AUDIENCE: z.string().default('nexuslinks-api'),

  // --- Cookies ---
  COOKIE_SECURE: booleanFromString,

  // --- Security ---
  PASSWORD_SALT_ROUNDS: z.coerce.number().int().min(8).max(20).default(12),
  MAX_LOGIN_ATTEMPTS: z.coerce.number().int().min(1).max(20).default(5),
  LOGIN_WINDOW_MINUTES: z.coerce.number().int().min(1).max(60).default(15),

  // --- Rate limiting ---
  RATE_LIMIT_MAX: z.coerce.number().int().min(1).default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().min(1000).default(60000),

  // --- Email (SMTP) ---
  SMTP_HOST: optionalString,
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).default(587),
  SMTP_USER: optionalString,
  SMTP_PASS: optionalString,
  SMTP_FROM: z.string().email('SMTP_FROM must be a valid email').default('noreply@nexuslinks.com'),
  EMAIL_ENABLED: booleanFromString,

  // --- Storage ---
  STORAGE_DRIVER: z.enum(['local', 's3']).default('local'),
  STORAGE_LOCAL_DIR: z.string().default('./storage'),
  STORAGE_PUBLIC_URL: z.string().url().default('http://localhost:3001'),

  // --- Metrics ---
  METRICS_ENABLED: booleanFromString,
})

export type Env = z.infer<typeof envSchema>

export function loadEnv(env: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(env)

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n')
    throw new Error(`Invalid environment configuration:\n${issues}`)
  }

  return result.data
}
