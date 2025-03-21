import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { uploadSingle } from "../utils/fileUpload.js";
import { validate } from "../middlewares/validate.js";
import { addCategorySchema, getCategorySchema, updateCategorySchema } from "../validations/categoryvalidation.js";
import subCategoriesRouter from "./subCategoryRoutes.js";
import { authorization, productedRoute } from "../controllers/authController.js";

const router = Router();

router.use("/:category/subcategories", subCategoriesRouter);
router.post(
  "/",
  productedRoute,
  authorization("admin"),
  uploadSingle("image", "categories"),
  validate(addCategorySchema),
  addCategory
);
router.get("/", getAllCategories);
router.get("/:id",validate(getCategorySchema), getCategory);
router.put(
  "/:id",
  uploadSingle("image", "categories"),
  validate(updateCategorySchema),
  updateCategory
);
router.delete("/:id", deleteCategory);

export default router;
