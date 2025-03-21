import Joi from "joi";

// Schema for order items
const orderItemSchema = Joi.object({
  product: Joi.string().hex().length(24).required(), // Validate MongoDB ObjectId
  quantity: Joi.number().integer().min(1).required(), // Quantity must be at least 1
  price: Joi.number().min(0).required(), // Price must be a non-negative number
});

// Schema for shipping address
const shippingAddressSchema = Joi.object({
  city: Joi.string().required(),
  street: Joi.string().required(),
  phone: Joi.string().required(),
});

// Schema for creating an order
export const createOrderSchema = Joi.object({
  user: Joi.string().hex().length(24).required(), // Validate MongoDB ObjectId
  orderItems: Joi.array().items(orderItemSchema).min(1).required(), // At least one order item
  totalOrderPrice: Joi.number().min(0).required(), // Total price must be non-negative
  shippingAddress: shippingAddressSchema.required(),
  paymentType: Joi.string().valid("cash", "payment").default("cash"),
  isPaid: Joi.boolean().default(false),
  paidAt: Joi.date().when("isPaid", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  isDelivered: Joi.boolean().default(false),
  deliveredAt: Joi.date().when("isDelivered", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
});
