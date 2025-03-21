import joi from "joi";

export const addProductSchema = joi.object({
  name: joi.string().min(1).max(50).required(),
  description: joi.string().min(30).max(2000).required(),
  price: joi.number().min(0).required(),
  priceAfterDiscount: joi.number().min(0).required(),
  stock: joi.number().min(0).required(),
  sold: joi.number().required(),
  rateAvg: joi.number().min(0).max(5).required(),
  rateCount: joi.number().required(),
  imageCover: joi
    .object({
      filename: joi.string().required(),
      fieldname: joi.string().required(),
      originalname: joi.string().required(),
      encoding: joi.string().required(),
      mimetype: joi
        .string()
        .valid("image/jpeg", "image/png", "image/gif", "image/jpg")
        .required(),
      destination: joi.string().required(),
      path: joi.string().required(),
      size: joi.number().max(5242880).required(),
    })
    .required(),
  images: joi.array().items(
    joi
      .object({
        filename: joi.string().required(),
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi
          .string()
          .valid("image/jpeg", "image/png", "image/gif", "image/jpg")
          .required(),
        destination: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required(),
      })
      .required()
  ),
});

// Schema for updating a product
export const updateProductSchema = joi
  .object({
    id: joi.string().required(),
    name: joi.string().min(1).max(50),
    description: joi.string().min(30).max(2000),
    price: joi.number().min(0),
    priceAfterDiscount: joi.number().min(0),
    stock: joi.number().min(0),
    sold: joi.number(),
    rateAvg: joi.number().min(0).max(5),
    rateCount: joi.number(),
    imageCover: joi.object({
      filename: joi.string(),
      fieldname: joi.string(),
      originalname: joi.string(),
      encoding: joi.string(),
      mimetype: joi
        .string()
        .valid("image/jpeg", "image/png", "image/gif", "image/jpg"),
      destination: joi.string(),
      path: joi.string(),
      size: joi.number().max(5242880),
    }),
    images: joi.array().items(
      joi.object({
        filename: joi.string(),
        fieldname: joi.string(),
        originalname: joi.string(),
        encoding: joi.string(),
        mimetype: joi
          .string()
          .valid("image/jpeg", "image/png", "image/gif", "image/jpg"),
        destination: joi.string(),
        path: joi.string(),
        size: joi.number().max(5242880),
      })
    ),
  })
  .min(1);


  export const getProductSchema = joi.object({
    id: joi.string().required(),
  })