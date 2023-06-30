import logger from "~/helpers/logger"
import { Middleware } from "~/type"

/**
 * authMiddleware
 */
export const loggerMiddleware: Middleware = async (request, _, next) => {
  logger.info(`method: ${request.method}`)
  logger.info(`endpoint: ${request.url}`)
  logger.info({ authorization: request.headers.authorization, body: request.body })
  next()
}
