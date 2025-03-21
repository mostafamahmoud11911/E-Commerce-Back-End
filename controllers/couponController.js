import { catchError } from "../middlewares/catchError.js";
import Coupon from "../models/couponModel.js";
import AppError from "../utils/AppError.js";

export const addCoupon = catchError(async (req, res, next) => {
  let isExist = await Coupon.findOne({ code: req.body.code });
  if (isExist) next(new AppError("Coupon is already exist", 409));
  const coupons = new Coupon(req.body);
  await coupons.save();
  res.status(201).json({ message: "success", coupons });
});

export const getAllCoupon = catchError(async (req, res, next) => {
  const coupons = await Coupon.find();
  coupons || next(new AppError("coupons is not exist", 404));
  !coupons || res.status(200).json({ message: "All coupons", coupons });
});

export const getCoupon = catchError(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);
  coupon || next(new AppError("Coupon is not found"));
  !coupon || res.status(200).json({ message: "success", coupon });
});

export const updateCoupon = catchError(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  coupon || next(new AppError("Coupon is not found"));
  !coupon || res.status(200).json({ message: "success updated", coupon });
});

export const deleteCoupon = catchError(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);
  coupon || next(new AppError("Coupon is not found"));
  !coupon || res.status(200).json({ message: "success deleted", coupon });
});
