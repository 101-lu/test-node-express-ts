import Joi from "joi"

/**
 * createUserValidator
 */
const createUserValidator = Joi.object<{ username: string; email: string; password: string }>({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})
export default createUserValidator
