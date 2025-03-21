import { catchError } from "../middlewares/catchError.js";
import Review from "../models/reviewModel.js";
import AppError from "../utils/AppError.js";

export const addReview = catchError(async (req, res, next) => {
  const findReview = await Review.findOne({
    user: req.user.id,
    product: req.body.product,
  });

  if (findReview) {
    return next(new AppError("you can't review again on this product", 400));
  }
  req.body.user = req.user.id;
  const review = new Review(req.body);

  await review.save();
  res.status(201).json({ message: "succuss created", review });
});

export const getAllReviews = catchError(async (req, res, next) => {
  const reviews = await Review.find();
  reviews || next(new AppError("reviews is not exist", 404));
  !reviews || res.status(200).json({ message: "All reviews", reviews });
});

export const getReview = catchError(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  review || next(new AppError("reviews is not exist", 404));
  !review || res.status(200).json({ message: "All reviews", review });
});

export const deleteReview = catchError(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  review || next(new AppError("review is not exist", 404));
  !review || res.status(200).json({ message: "success deleted", review });
});

export const updateReview = catchError(async (req, res, next) => {
  const review = await Review.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  review || next(new AppError("review is not exist", 404));
  !review || res.status(200).json({ message: "success updated", review });

  next(new AppError("you can't update this review", 400));
});
