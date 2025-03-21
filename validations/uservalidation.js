import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(50).required(),
  otp: Joi.string().min(6).max(6),
  expireOtp: Joi.date(),
  isBlocked: Joi.boolean().default(false),
  role: Joi.string().default(false),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(50).required(),
});


export const changePasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  oldPassword: Joi.string().min(8).max(50).required(),
  newPassword: Joi.string().min(8).max(50).required(),
});


export const userUpdateSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(1).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(50),
  otp: Joi.string().min(6).max(6),
  expireOtp: Joi.date(),
  isBlocked: Joi.boolean().default(false),
  role: Joi.string().default(false),
});

export const getUserSchema = Joi.object({
  id: Joi.string().required(),
})
