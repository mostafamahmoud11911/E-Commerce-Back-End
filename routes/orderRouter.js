import express from "express";
import {
  authorization,
  productedRoute,
} from "../controllers/authController.js";
import {
  createCashOrder,
  createCheckoutSession,
  getAllOrders,
  getUserOrders,
} from "../controllers/orderController.js";
import { validate } from "../middlewares/validate.js";
import { createOrderSchema } from "../validations/ordervalidation.js";

const orderRouter = express.Router({ mergeParams: true });



orderRouter.post(
  "/:id",
  productedRoute,
  authorization("user"),
  validate(createOrderSchema),
  createCashOrder
);
orderRouter.get(
  "/users",
  productedRoute,
  authorization("user", "admin"),
  getUserOrders
);
orderRouter.get(
  "/",
  productedRoute,
  authorization("admin"),
  getAllOrders
);

orderRouter.post(
  "/checkout/:id",
  productedRoute,
  authorization("user"),
  createCheckoutSession
);

export default orderRouter;
