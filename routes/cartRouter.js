import express from "express";
import {
  authorization,
  productedRoute,
} from "../controllers/authController.js";
import {
  addToCart,
  applyCoupon,
  clearUserCart,
  getLoggedUserCart,
  removeItemFromCart,
  updateCart,
} from "../controllers/cartController.js";
import { validate } from "../middlewares/validate.js";
import { createCartSchema, deleteCartSchema, updateCartSchema } from "../validations/cartvalidation.js";

const cartRouter = express.Router();

cartRouter.post("/", productedRoute, authorization("user"), addToCart);
cartRouter.put("/:id", productedRoute, authorization("user"), updateCart);
cartRouter.delete(
  "/:id",
  productedRoute,
  authorization("user"),
  validate(deleteCartSchema),
  removeItemFromCart
);
cartRouter.get(
  "/",
  productedRoute,
  authorization("user"),
  getLoggedUserCart
);

cartRouter.delete("/", productedRoute, authorization("user"), clearUserCart)
cartRouter.post("/apply-coupon", productedRoute, authorization("user"), applyCoupon)


export default cartRouter;
