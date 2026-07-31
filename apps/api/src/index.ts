import { buildApp } from './app.js'
import { startServer, setupShutdown } from './server.js'

async function main() {
  const { app, close } = await buildApp()
  setupShutdown(app, close)
  await startServer(app)
}

main()
