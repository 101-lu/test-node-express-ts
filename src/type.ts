import express from "express"

export type Middleware = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => Promise<void>
export type UserDB = {
  id: string
  username: string
  email: string
  password: string
}
export type SessionDB = {
  id: string
  userId: string
  token: string
}