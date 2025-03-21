import Joi from "joi";

const cartItemSchema = Joi.object({
  product: Joi.string().hex().length(24), // Validate MongoDB ObjectId
  quantity: Joi.number().integer().min(1).default(1), // Quantity must be at least 1, default is 1
});

// Schema for creating a cart
export const createCartSchema = Joi.object({
  cartItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().hex().length(24), // Validate MongoDB ObjectId
        quantity: Joi.number().integer().min(1).default(1), // Quantity must be at least 1, default is 1
      })
    )
    .min(1), // At least one cart item
});

// Schema for updating a cart
export const updateCartSchema = Joi.object({
  user: Joi.string().hex().length(24).optional(), // Optional for update
  cartItems: Joi.array().items(cartItemSchema).min(1).optional(), // Optional for update
  totalCartPrice: Joi.number().min(0).optional(), // Optional for update
  discount: Joi.number().min(0).optional(), // Optional for update
  priceAfterDiscount: Joi.number().min(0).optional(), // Optional for update
}).min(1); // At least one field must be provided for update

// Schema for deleting a cart (only ID is required)
export const deleteCartSchema = Joi.object({
  id: Joi.string().hex().length(24).required(), // Validate MongoDB ObjectId
});

// Schema for getting a cart by ID (only ID is required)
export const getCartByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(), // Validate MongoDB ObjectId
});
