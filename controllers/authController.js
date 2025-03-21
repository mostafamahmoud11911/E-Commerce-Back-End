import { catchError } from "../middlewares/catchError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

const signup = catchError(async (req, res, next) => {
  const user = new User(req.body);
  await user.save();
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.status(201).json({ message: "success", token });
});

const signin = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    return res.status(200).json({ message: "success", token });
  }
  next(new AppError("invalid email or password", 401));
});

const changePassword = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.newPassword, passwordChangedAt: Date.now() }
    );
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    return res.status(200).json({ message: "success updated password", token });
  }

  next(new AppError("invalid email or password", 401));
});

const productedRoute = catchError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next(new AppError("unauthorized", 401));

  let userPayload = null;
  jwt.verify(token, "ahmed", (err, decoded) => {
    if (err) return next(new AppError(err, 401));
    userPayload = decoded;
  });

  const user = await User.findById(userPayload.id);
  if (!user) return next(new AppError("unauthorized", 401));

  if (user?.passwordChangedAt) {
    let time = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (time > userPayload.iat)
      return next(new AppError("invalid token..try again", 401));
  }

  req.user = user;
  next();
});

const authorization = (...roles) => {
  return catchError(async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    return next(
      new AppError("you are not authorized to access this endpoint", 401)
    );
  });
};

export { signup, signin, changePassword, productedRoute, authorization };
