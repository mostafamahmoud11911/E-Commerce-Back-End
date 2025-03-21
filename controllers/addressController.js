import { catchError } from "../middlewares/catchError.js";
import User from "../models/userModel.js";

export const addAddress = catchError(async (req, res) => {
  const address = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { addresses: req.body } },
    { new: true }
  );

  address || next(new AppError("user is not exist", 404));
  !address ||
    res
      .status(200)
      .json({ message: "success added", address: address.addresses });
});

export const removeAddress = catchError(async (req, res) => {
  const address = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { addresses: { _id: req.params.id } } },
    { new: true }
  );

  address || next(new AppError("user is not exist", 404));
  !address ||
    res
      .status(200)
      .json({ message: "address removed", address: address.addresses });
});

export const getLoggedUserAdderess = catchError(async (req, res) => {
  const address = await User.findById(req.user.id);

  address || next(new AppError("user is not exist", 404));
  !address ||
    res
      .status(200)
      .json({ message: "address", address: address.addresses });
});
