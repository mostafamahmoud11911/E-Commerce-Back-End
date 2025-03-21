import { Router } from "express";
import {
  addBrand,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} from "../controllers/brandController.js";
import { uploadSingle } from "../utils/fileUpload.js";
import { validate } from "../middlewares/validate.js";
import {
  addBrandSchema,
  getBrandSchema,
  updateBrandSchema,
} from "../validations/brandvalidation.js";

const router = Router();

router.post(
  "/",
  uploadSingle("logo", "brands"),
  validate(addBrandSchema),
  addBrand
);
router.get("/", getAllBrands);
router.get("/:id", validate(getBrandSchema), getBrand);
router.put(
  "/:id",
  uploadSingle("logo", "brands"),
  validate(updateBrandSchema),
  updateBrand
);
router.delete("/:id", validate(getBrandSchema), deleteBrand);

export default router;
