import jwt from "jsonwebtoken"
import express from "express"
import { config } from "~/config"
import { Context } from "./expressRequest"
import { G, S } from "@mobily/ts-belt"

/**
 * token
 */
const JWTtoken = {
  /**
   * generate
   */
  generate: (payload: { user: string; session: string }, options: jwt.SignOptions = {}) => {
    return jwt.sign(payload, config.appKey, {
      ...options,
      expiresIn: config.JWTTtl,
    })
  },

  /**
   * verify
   */
  verify: (token: string) => {
    try {
      const tokenVerified = jwt.verify(token, config.appKey)
      const decoded = typeof tokenVerified === "string" ? null : (tokenVerified as { user: string; session: string })
      return {
        valid: true,
        expired: false,
        decoded,
      }
    } catch (err) {
      const invalid = { valid: false, expired: true, decoded: null }
      if (err instanceof jwt.TokenExpiredError) invalid.expired = err.message === "jwt expired"
      return invalid
    }
  },

  /**
   * parseAuthorization
   */
  parseAuthorization: (request: Context["request"]) => {
    const { authorization } = request.headers()
    return G.isNotNullable(authorization) ? S.replaceByRe(authorization, /^Bearer\s/, "") : undefined
  },
}

export default JWTtoken
