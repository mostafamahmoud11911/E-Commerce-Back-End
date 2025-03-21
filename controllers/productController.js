import { catchError } from "../middlewares/catchError.js";
import Product from "../models/productModel.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";
import AppError from "../utils/AppError.js";
import fs from "fs";
import path from "path";

export const addProduct = catchError(async (req, res, next) => {
  req.body.slug = req.body.name;

  if(req.files.imageCover) req.body.imageCover = req.files?.imageCover[0]?.filename;
  if(req.files.images) req.body.images = req.files?.images.map((file) => file.filename);
  const product = new Product(req.body);
  await product.save();
  res.status(201).json({ message: "success created", product });
});

export const getAllProducts = catchError(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Product.find(), req.query).filter().selectFields().search().sort();

  const products = await apiFeatures.mongooseQuery;

  products || next(new AppError("products is not exist", 404));
  !products ||
    res.status(200).json({
      message: "Products",
      pageNumber: apiFeatures.pageNumber,
      nextPage: apiFeatures.nextPage,
      pagePrev: apiFeatures.pagePrev,
      products,
    });
});

export const getProduct = catchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  product || next(new AppError("product is not exist", 404));
  !product || res.status(200).json({ message: "product", product });
});

export const updateProduct = catchError(async (req, res, next) => {
  const item = await Product.findById(req.params.id);
  if (req.file) {
    req.body.imageCover = req.files.imageCover[0].filename;
    req.body.images = req.files.images.map((file) => file.filename);
    const imageCover =
      item.imageCover.split("/")[item.imageCover.split("/").length - 1];
    const images = item.images.split("/")[item.images.split("/").length - 1];
    fs.unlink(
      path.join(process.cwd(), "/uploads/products", imageCover),
      (err) => {
        if (err) {
          next(new AppError("Failed to delete image", 500));
        }
      }
    );
    images.forEach((image) => {
      fs.unlink(path.join(process.cwd(), "/uploads/products", image), (err) => {
        if (err) {
          next(new AppError("Failed to delete image", 500));
        }
      });
    })
  }
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  product || next(new AppError("product is not exist", 404));
  !product || res.status(200).json({ message: "success updated", product });
});

export const deleteProduct = catchError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  product || next(new AppError("product is not exist", 404));
  !product || res.status(200).json({ message: "success deleted", product });
});
