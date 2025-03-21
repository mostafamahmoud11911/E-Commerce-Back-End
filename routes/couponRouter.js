import express from "express";
import {
  addCoupon,
  deleteCoupon,
  getAllCoupon,
  getCoupon,
  updateCoupon,
} from "../controllers/couponController.js";
import {
  authorization,
  productedRoute,
} from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import {
  addCouponSchema,
  getCouponSchema,
  updateCouponSchema,
} from "../validations/couponvalidation.js";

const couponRouter = express.Router();

couponRouter.post(
  "/",
  productedRoute,
  authorization("admin"),
  validate(addCouponSchema),
  addCoupon
);
couponRouter.get("/", productedRoute, authorization("admin"), getAllCoupon);
couponRouter.get(
  "/:id",
  productedRoute,
  authorization("admin"),
  validate(getCouponSchema),
  getCoupon
);
couponRouter.put(
  "/:id",
  productedRoute,
  authorization("admin"),
  validate(updateCouponSchema),
  updateCoupon
);
couponRouter.delete(
  "/:id",
  productedRoute,
  authorization("admin"),
  validate(getCouponSchema),
  deleteCoupon
);

export default couponRouter;
