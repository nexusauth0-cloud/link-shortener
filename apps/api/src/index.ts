import Fastify from 'fastify'
import { healthRoute } from './routes/health.js'

const app = Fastify({ logger: true })

await app.register(healthRoute)

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001
    const host = process.env.HOST || '0.0.0.0'
    await app.listen({ port, host })
    console.log(`Server listening on ${host}:${port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
