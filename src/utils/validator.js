import Joi from "joi";

const email = Joi.string().email().required();
const password = Joi.string().min(8).max(15).required();

export const registerValidator = Joi.object({
  lastname: Joi.string().required().alphanum(),
  firstname: Joi.string().required().alphanum(),
  age: Joi.number().min(18).required(),
  gender: Joi.string().valid("male", "female").required(),
  username: Joi.string().required().alphanum(),
  email,
  password,
});

export const loginValidator = Joi.object({
  email,
  password,
});