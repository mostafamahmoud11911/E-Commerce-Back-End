import { catchError } from "../middlewares/catchError.js";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

export const addTowishlist = catchError(async (req, res, next) => {
  const wishlist = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $addToSet: { wishlist: req.body.product } },
    { new: true }
  );

  wishlist || next(new AppError("wishlist is not exist", 404));
  !wishlist ||
    res
      .status(200)
      .json({ message: "success added", wishlist: wishlist.wishlist });
});

export const removeFromWishlist = catchError(async (req, res, next) => {
  const wishlish = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $pull: { wishlist: req.params.id } },
    { new: true }
  );
  wishlish || next(new AppError("wishlist is not exist", 404));
  !wishlish ||
    res
      .status(200)
      .json({ message: "success removed", wishlish: wishlish.wishlist });
});

export const getLoggedUserWishlist = catchError(async (req, res, next) => {
  const wishlish = await User.findById({ _id: req.user.id }).populate(
    "wishlist"
  );
  wishlish || next(new AppError("wishlist is not exist", 404));
  !wishlish ||
    res
      .status(200)
      .json({ message: "wishlist", wishlish: wishlish.wishlist });
});
