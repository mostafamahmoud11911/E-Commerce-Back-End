import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import { catchError } from "../middlewares/catchError.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";

export const getAllUsers = catchError(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(User.find(), req.query)
    .pagination()
    .filter()
    .search()
    .selectFields()
    .sort();

  let users = await apiFeatures.mongooseQuery;
  users || next(new AppError("users is not exist", 404));
  !users ||
    res
      .status(200)
      .json({
        message: "All users",
        pageNumber: apiFeatures.pageNumber,
        nextPage: apiFeatures.nextPage,
        pagePrev: apiFeatures.pagePrev,
        users,
      });
});



export const addUser = catchError(async (req, res, next) => {

  let users = new User(req.body);
  await users.save();

  res.status(201).json({ message: "succuss created", users });
});





export const getUser = catchError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  user || next(new AppError("user is not exist", 404));
  !user || res.status(200).json({ message: "User", user });
});

export const updateUser = catchError(async (req, res, next) => {

  let user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  user || next(new AppError("user is not exist", 404));
  !user || res.status(200).json({ message: "success update", user });
});

export const deleteUser = catchError(async (req, res, next) => {

  let user = await User.findByIdAndDelete(req.params.id);
  user || next(new AppError("user is not exist", 404));
  !user || res.status(200).json({ message: "success delete", user });
});
