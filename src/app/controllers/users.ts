import { Router } from "express"
import User from "~/app/models/User"
import Session from "~/app/models/Session"
import expressRequest from "~/helpers/expressRequest"
import { A, G, D, S } from "@mobily/ts-belt"
import createUserValidator from "~/app/validators/createUser"
import updateUserValidator from "~/app/validators/updateUser"
import { authMiddleware } from "~/app/middleware/auth"

/**
 * Todo: find a solution to not leave each endpoint accessible by whole world (cors is not a solution :) )
 *  Two choice
 *  - create a middleware to protect each routes users/ like that controller.use(authMiddleware) the file is allready created
 *  - protect each routes in /users individualy
 *  - best way: create a middleware to extend request in case user token is available with login in user
 */

const controller = Router()

/**
 * findAll
 */
controller.get(
  "/",
  expressRequest(async ({ request, response }) => {
    // Todo: protect access for authenticated user
    response.ok(A.map(await User.findAll(), (user) => user.json()))
  })
)

/**
 * findOne
 */
controller.get(
  "/:id",
  expressRequest(async ({ request, response }) => {
    // Todo: protect access for authenticated user
    const id = request.param("id")
    const user = await User.findOne(id)
    if (G.isNullable(user)) return response.notFound({ message: "user not found" })
    return response.ok(user.json())
  })
)

/**
 * create
 */
controller.post(
  "/",
  expressRequest(async ({ request, response }) => {
    // Todo: protect access for authenticated user
    const data = await request.validate(createUserValidator)
    const user = await User.create(data)
    return response.created(user.json())
  })
)

/**
 * update
 */
controller.put(
  "/:id",
  expressRequest(async ({ request, response }) => {
    // Todo: protect access for authenticated user
    const id = request.param("id")
    const user = await User.findOne(id)
    if (G.isNullable(user)) return response.notFound({ message: "user not found" })
    const data = await request.validate(updateUserValidator)
    user.merge(data)
    await user.save()
    return response.ok(user.json())
  })
)

/**
 * update
 */
controller.delete(
  "/:id",
  expressRequest(async ({ request, response }) => {
    // Todo: protect access for authenticated user
    const id = request.param("id")
    const user = await User.findOne(id)
    if (G.isNullable(user)) return response.notFound({ message: "user not found" })
    await user.delete()
    return response.noContent()
  })
)

export default controller
