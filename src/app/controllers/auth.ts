import { Router } from "express"
import JWTtoken from "~/helpers/JWTtoken"
import expressRequest from "~/helpers/expressRequest"
import Session from "~/app/models/Session"
import User from "~/app/models/User"
import signInValidator from "~/app/validators/signIn"
import { A, G, D, S } from "@mobily/ts-belt"

/**
 * Todo: Logic to signIn, signOut and check if a session is valid
 * each required files are allready imported
 * a bridge on express has been created everything is typed and explicitly documented
 * a fake database and ORM is available with crud operation: fineAll, findOne and
 * create are static from Model and create, delete and save on model result
 * database is non presistent and will be reset on each hot reload you can add row inside with a fixe session to work fastly
 * token must be find in 'authorization: Bearer my123super456token'
 * you can use Postman to test endpoint or what you want
 * ! Data must only be send in raw JSON or x-www-form (i don't know why but formData doesn't work)
 * you can send me a mail if you have some question yann@101.lu (ain't afraid to ask questions we ain't losing nobody)
 */

const controller = Router()

/**
 * sign-in
 */
controller.get(
  "/sign-in",
  expressRequest(async ({ request, response }) => {
    // Todo: Logic to signin a user
    // create validation schema in signInValidator
    // valid request body
    // check user credential
    // create session for user
    // response.ok({user, session}) | response.badRequest()
    response.badRequest()
  })
)

/**
 * sign-out
 */
controller.get(
  "/sign-out",
  expressRequest(async ({ request, response }) => {
    // Todo: Logic to signout a user
    // verify token validity JWTtoken.verify(token), token must be find in request.headers().authorization
    // get user to be sure and delete session
    // response.noContent() | response.badRequest()
    response.badRequest()
  })
)

/**
 * session
 */
controller.get(
  "/session",
  expressRequest(async ({ request, response }) => {
    // Todo: Logic to check user session
    // verify token validity JWTtoken.verify(token)
    // check if session exist and token correspond
    // response.ok({user, session: true}) or response.ok({ session: false})
    response.badRequest()
  })
)

export default controller
