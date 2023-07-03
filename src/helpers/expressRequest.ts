import express from "express"
import Joi from "joi"
import { A, D, G } from "@mobily/ts-belt"
import { ValidationException } from "~/app/exceptions/ValidationException"

const expressRequest =
  (fn: (context: Context) => Promise<express.Response<any, Record<string, any>> | void>) =>
  (request: express.Request, response: express.Response, next: express.NextFunction) => {
    return Promise.resolve(fn(generateContext(request, response, next))).catch(next)
  }

export default expressRequest

const generateContext = (request: express.Request, response: express.Response, next: express.NextFunction) => ({
  request: {
    headers: () => request.headers,
    param: (key: string) => request.params[key],
    params: () => request.params,
    validate: async <T extends Record<string, any>>(schema: Joi.ObjectSchema<T>) => {
      const data = schema.validate(request.body)
      if (G.isNotNullable(data.error)) {
        throw new ValidationException(data.error)
      }
      return data.value as T
    },
    original: request,
  },
  response: {
    ok: (json?: Record<string, any>) => response.status(200).json(json ?? {}),
    created: (json?: Record<string, any>) => response.status(201).json(json ?? {}),
    accepted: (json?: Record<string, any>) => response.status(203).json(json ?? {}),
    noContent: () => response.status(204).json(),
    badRequest: (json?: Record<string, any>) => response.status(400).json(json ?? {}),
    unauthorized: (json?: Record<string, any>) => response.status(401).json(json ?? {}),
    forbidden: (json?: Record<string, any>) => response.status(403).json(json ?? {}),
    notFound: (json?: Record<string, any>) => response.status(404).json(json ?? {}),
    notAllowed: (json?: Record<string, any>) => response.status(405).json(json ?? {}),
    original: response,
  },
  next,
})
export type Context = ReturnType<typeof generateContext>
