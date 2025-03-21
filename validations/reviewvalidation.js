import Joi from "joi";

export const createReviewSchema = Joi.object({
  comment: Joi.string().allow("").optional(), // Comment is optional and can be an empty string
  rate: Joi.number().min(0).max(5).required(), // Rate must be between 0 and 5
  user: Joi.string().hex().length(24).required(), // Validate MongoDB ObjectId for user
  product: Joi.string().hex().length(24).required(), // Validate MongoDB ObjectId for product
});

// Schema for updating a review
export const updateReviewSchema = Joi.object({
  comment: Joi.string().allow("").optional(), // Comment is optional and can be an empty string
  rate: Joi.number().min(0).max(5).optional(), // Rate is optional but must be between 0 and 5 if provided
  user: Joi.string().hex().length(24).optional(), // Optional for update
  product: Joi.string().hex().length(24).optional(), // Optional for update
}).min(1); // At least one field must be provided for update

// Schema for deleting a review (only ID is required)
export const deleteReviewSchema = Joi.object({
  id: Joi.string().hex().length(24).required(), // Validate MongoDB ObjectId
});

// Schema for getting a review by ID (only ID is required)
export const getReviewByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(), // Validate MongoDB ObjectId
});
