import { catchError } from "../middlewares/catchError.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subCategoryModel.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";
import AppError from "../utils/AppError.js";

export const getAllSubCategories = catchError(async (req, res, next) => {
  let filterObj = {};
  if (req.params.category) filterObj.category = req.params.category;

  const apiFeatures = new ApiFeatures(Subcategory.find(filterObj), req.query)
    .pagination()
    .filter()
    .search()
    .selectFields()
    .sort();

  let subCategories = await apiFeatures.mongooseQuery;
  subCategories || next(new AppError("subCategories is not exist", 404));
  !subCategories ||
    res.status(200).json({
      message: "All SubCategories",
      pageNumber: apiFeatures.pageNumber,
      nextPage: apiFeatures.nextPage,
      pagePrev: apiFeatures.pagePrev,
      subCategories,
    });
});

export const getSubCategory = catchError(async (req, res, next) => {
  const subCategory = await Subcategory.findById(req.params.id);
  subCategory || next(new AppError("subcategory is not exist", 404));
  !subCategory || res.status(200).json({ message: "SubCategory", subCategory });
});

export const addSubCategory = catchError(async (req, res, next) => {
  req.body.slug = req.body.name;
  const category = await Category.findById(req.body.category);
  if (category) {
    const subCategory = new Subcategory(req.body);
    await subCategory.save();
    res.status(201).json({ message: "SubCategory", subCategory });
  } else {
    next(new AppError("category is not exist", 404));
  }
});

export const deleteSubCategory = catchError(async (req, res, next) => {
  const subCategory = await Subcategory.findByIdAndDelete(req.params.id);
  subCategory || next(new AppError("subcategory is not exist", 404));
  !subCategory ||
    res.status(200).json({ message: "success deleted", subCategory });
});

export const updateSubCategory = catchError(async (req, res, next) => {
  req.body.slug = req.body.name;
  const subCategory = await Subcategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  subCategory || next(new AppError("subcategory is not exist", 404));
  !subCategory ||
    res.status(200).json({ message: "success updated", subCategory });
});
