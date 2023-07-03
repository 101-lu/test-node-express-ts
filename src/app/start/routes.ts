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
  server.get("/healhcheck", (_, response) =>
    response.status(200).json({
      message: `I got a feeling 🎶 That today's gonna be a good day 😜`,
    })
  )
  server.get("/", (_, response) =>
    response.status(200).json({
      message: `Welcome to the Node Express TS base app`,
    })
  )
  server.use("/users", usersController)
  server.use("/auth", authController)

  /**
   * fallback
   */
  server.all("*", unknownRoutesHandler)

  return server
}
export default routes
