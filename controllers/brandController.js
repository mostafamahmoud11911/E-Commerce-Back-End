import slugify from "slugify";
import { catchError } from "../middlewares/catchError.js";
import Brand from "../models/brandModel.js";
import AppError from "../utils/AppError.js";
import path from "path";
import fs from "fs";

export const addBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  const brand = new Brand(req.body);
  await brand.save();
  res.status(201).json({ message: "success", brand });
});

export const getAllBrands = catchError(async (req, res, next) => {
  const brands = await Brand.find();
  brands || next(new AppError("brands is not exist"));
  !brands || res.status(200).json({ message: "All Brands", brands });
});

export const getBrand = catchError(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  brand || next(new AppError("brand is not exist"));
  !brand || res.status(200).json({ message: "All Brands", brand });
});

export const updateBrand = catchError(async (req, res, next) => {
  req.body.slug = req.body.name;
  const item = await Brand.findById(req.params.id);
  item || next(new AppError("brand is not exist"));
  if (req.file) {
    req.body.logo = req.file.filename;
    const logo = item.logo.split("/")[item.logo.split("/").length - 1];
    const imagePath = path.join(process.cwd(), "/uploads/brands", logo);
    fs.unlink(imagePath, (err) => {
      if (err) {
        next(new AppError("Failed to delete image", 500));
      }
    });
  }
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  brand || next(new AppError("brands is not exist"));
  !brand || res.status(200).json({ message: "success updated", brand });
});

export const deleteBrand = catchError(async (req, res, next) => {
  const item = await Brand.findById(req.params.id);
  item || next(new AppError("brand is not exist"));

  const logo = item.logo.split("/")[item.logo.split("/").length - 1];
  const imagePath = path.join(process.cwd(), "/uploads/brands", logo);
  fs.unlink(imagePath, (err) => {
    if (err) {
      next(new AppError("Failed to delete image", 500));
    }
  });
  const brand = await Brand.findByIdAndDelete(req.params.id);
  brand || next(new AppError("brands is not exist"));
  !brand || res.status(200).json({ message: "success deleted", brand });
});
