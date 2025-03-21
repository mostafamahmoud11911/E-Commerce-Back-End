import { Router } from "express";
import {
  addSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import { validate } from "../middlewares/validate.js";
import {
  addSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
} from "../validations/subcategoryvalidation.js";

const subCategoriesRouter = Router({ mergeParams: true });

subCategoriesRouter.post("/", validate(addSubCategorySchema), addSubCategory);
subCategoriesRouter.get("/", getAllSubCategories);
subCategoriesRouter.get("/:id", validate(getSubCategorySchema), getSubCategory);
subCategoriesRouter.put(
  "/:id",
  validate(updateSubCategorySchema),
  updateSubCategory
);
subCategoriesRouter.delete(
  "/:id",
  validate(getSubCategorySchema),
  deleteSubCategory
);

export default subCategoriesRouter;
