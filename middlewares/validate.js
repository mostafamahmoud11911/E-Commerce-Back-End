import AppError from "../utils/AppError.js";

export const validate = (schema) => {
  return async (req, res, next) => {
    let obj = {};

    if (req.file?.fieldname === "image") {
      obj.image = req.file;
    } else if (req.file?.fieldname === "logo") {
      obj.logo = req.file;
    } else if (req.files?.imageCover[0]?.fieldname === "imageCover") {
      obj.imageCover = req.files.imageCover[0];
    }

    const { error } = schema.validate(
      { ...obj, ...req.body, ...req.params, ...req.query },
      { abortEarly: false }
    );
    if (!error) {
      next();
    } else {
      let errMsgs = error.details.map((err) => err.message);
      return next(new AppError(errMsgs, 400));
    }
  };
};
