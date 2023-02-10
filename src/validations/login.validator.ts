import Joi from "joi";

export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
});

export const signupValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
    name: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    userName: Joi.string().min(1).required(),
    photo: Joi.string(),
  });