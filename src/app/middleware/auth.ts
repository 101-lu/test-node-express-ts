import { Middleware } from "~/type"

/**
 * authMiddleware
 */
export const authMiddleware: Middleware = async (request, response, next) => {
  next()
}
