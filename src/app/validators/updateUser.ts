import Joi from "joi"

/**
 * createUserValidator
 */
const updateUserValidator = Joi.object<{ username?: string; email?: string; password?: string }>({
  username: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
})
export default updateUserValidator
