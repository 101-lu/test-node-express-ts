import express, { Express } from "express"
import cors from "cors"
import { exceptionsHandler } from "../middleware/exceptionsHandler"
import routes from "./routes"
import logger from "~/helpers/logger"
import { loggerMiddleware } from "../middleware/logger"

/**
 * kernel
 */
const kernel = (server: Express) => {
  /**
   * register middelware
   */
  server.use(cors())
  server.use(express.urlencoded({ extended: true }))
  server.use(express.json())
  server.use(express.raw())
  server.use(loggerMiddleware)

  /**
   * register routes
   */
  routes(server)

  /**
   * handle errors
   */
  server.use(exceptionsHandler)

  return server
}
export default kernel
