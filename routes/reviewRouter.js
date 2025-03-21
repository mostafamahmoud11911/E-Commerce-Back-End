import { Router } from "express";
import { addReview, deleteReview, getAllReviews, getReview, updateReview } from "../controllers/reviewController.js";
import {
  authorization,
  productedRoute,
} from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { createReviewSchema, deleteReviewSchema, getReviewByIdSchema, updateReviewSchema } from "../validations/reviewvalidation.js";

const reviewRouter = Router();

reviewRouter.post("/", productedRoute, authorization("user"),validate(createReviewSchema), addReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", validate(getReviewByIdSchema), getReview);
reviewRouter.put("/:id", productedRoute, authorization("user"),validate(updateReviewSchema), updateReview);
reviewRouter.delete(
  "/:id",
  productedRoute,
  authorization("user", "admin"),
  validate(deleteReviewSchema),
  deleteReview
);

export default reviewRouter;
