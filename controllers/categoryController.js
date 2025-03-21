import Category from "../models/categoryModel.js";
import slugify from "slugify";
import AppError from "../utils/AppError.js";
import { catchError } from "../middlewares/catchError.js";
import fs from "fs";
import path from "path";
import { ApiFeatures } from "../utils/ApiFeatures.js";

export const getAllCategories = catchError(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .pagination()
    .filter()
    .search()
    .selectFields()
    .sort();

  let categories = await apiFeatures.mongooseQuery;
  categories || next(new AppError("categories is not exist", 404));
  !categories ||
    res
      .status(200)
      .json({
        message: "All Categories",
        pageNumber: apiFeatures.pageNumber,
        nextPage: apiFeatures.nextPage,
        pagePrev: apiFeatures.pagePrev,
        categories,
      });
});

export const addCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  if(req.file)req.body.image = req.file.filename;
  let categories = new Category(req.body);
  await categories.save();

  res.status(201).json({ message: "succuss created", categories });
});

export const getCategory = catchError(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  category || next(new AppError("category is not exist", 404));
  !category || res.status(200).json({ message: "Category", category });
});

export const updateCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);

  const item = await Category.findById(req.params.id);

  if (req.file) {
    req.body.image = req.file.filename;
    const image = item.image.split("/")[item.image.split("/").length - 1];
    const imagePath = path.join(process.cwd(), "/uploads/categories", image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        next(new AppError("Failed to delete image", 500));
      }
    });
  }

  let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  category || next(new AppError("category is not exist", 404));
  !category || res.status(200).json({ message: "success update", category });
});

export const deleteCategory = catchError(async (req, res, next) => {
  const item = await Category.findById(req.params.id);
  const image = item.logo.split("/")[item.logo.split("/").length - 1];
  const imagePath = path.join(process.cwd(), "/uploads/brands", image);
  fs.unlink(imagePath, (err) => {
    if (err) {
      next(new AppError("Failed to delete image", 500));
    }
  });
  let category = await Category.findByIdAndDelete(req.params.id);
  category || next(new AppError("category is not exist", 404));
  !category || res.status(200).json({ message: "success delete", category });
});
