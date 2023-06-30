import { NextFunction, Request, Response } from "express"
import { Middleware } from "~/type"
import { A, G } from "@mobily/ts-belt"
import logger from "~/helpers/logger"
/**
 * exceptionsHandler
 */
export const exceptionsHandler = (error: any, _: Request, response: Response, next: NextFunction) => {
  logger.error(`status: ${error.status ?? 500}`)
  logger.error(error?.error ? error.error : error)
  if (response.headersSent) {
    return next(error)
  }

  if (error.status && error.error) {
    return response.status(error.status).json({ error: error.error })
  }

  return response.status(500).json({ error: "internal server error" })
}
