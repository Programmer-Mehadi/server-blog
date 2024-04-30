import app from "./app"
import { createServer } from "http"
import config from "./config"

// Create an HTTP server

async function bootstrap() {
  const serverPre = createServer(app)

  const server: any = serverPre.listen(config.port, () => {
    console.info(`Server running on port ${config.port}`)
  })

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Server closed")
      })
    }
    process.exit(1)
  }

  const unexpectedErrorHandler = (error: unknown) => {
    console.error(error)
    exitHandler()
  }

  process.on("uncaughtException", unexpectedErrorHandler)
  process.on("unhandledRejection", unexpectedErrorHandler)

  process.on("SIGTERM", () => {
    console.info("SIGTERM received")
    if (server) {
      server.close()
    }
  })
}

bootstrap()
