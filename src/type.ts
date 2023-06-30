import express from "express"

export type Middleware = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => Promise<void>
