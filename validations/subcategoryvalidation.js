import Joi from "joi";

export const addSubCategorySchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  slug: Joi.string().min(1).max(50).required(),
});

export const updateSubCategorySchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(1).max(50),
  slug: Joi.string().min(1).max(50),
});

export const getSubCategorySchema = Joi.object({
  id: Joi.string().required(),
});
