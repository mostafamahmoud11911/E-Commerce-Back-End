import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

const existEmail = async (req, res, next) => {
  const isExist =await User.findOne({ email: req.body.email });
  if (isExist) next(new AppError("Email is already exist", 409));
  next();
};


export default existEmail;