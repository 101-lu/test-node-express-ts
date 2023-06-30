import { Express } from "express"
import { unknownRoutesHandler } from "../middleware/unknownRoutesHandler"
import usersController from "../controllers/users"
import authController from "../controllers/auth"

/**
 * routes
 */
const routes = (server: Express) => {
  /**
   * route list
   */
  server.use("/users", usersController)
  server.use("/auth", authController)

  /**
   * fallback
   */
  server.all("*", unknownRoutesHandler)

  return server
}
export default routes
