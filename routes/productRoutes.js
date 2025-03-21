import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { uploadMax } from "../utils/fileUpload.js";
import { validate } from "../middlewares/validate.js";
import { addProductSchema, getProductSchema, updateProductSchema } from "../validations/productvalidation.js";

const router = Router();

router.post(
  "/",
  uploadMax(
    [
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ],
    "products"
  ),
  validate(addProductSchema),
  addProduct
);
router.get("/", getAllProducts);
router.get("/:id",validate(getProductSchema), getProduct);
router.put(
  "/:id",
  uploadMax(
    [
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ],
    "products"
  ),
  validate(updateProductSchema),
  updateProduct
);
router.delete("/:id",validate(getProductSchema), deleteProduct);

export default router;