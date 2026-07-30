import { buildApp } from './app.js'
import { startServer, setupShutdown } from './server.js'

async function main() {
  const app = await buildApp()
  setupShutdown(app)
  await startServer(app)
}

main()
