import { z } from 'zod'

const seedEnvSchema = z.object({
  SEED_ADMIN_EMAIL: z.string().email().optional(),
  SEED_ADMIN_PASSWORD: z.string().min(8).optional(),
  SEED_ADMIN_USERNAME: z.string().min(3).max(30).default('nexusadmin'),
})

const result = seedEnvSchema.safeParse(process.env)

if (!result.success) {
  console.error('Invalid seed environment variables:', result.error.issues)
  process.exit(1)
}

export const env = result.data
