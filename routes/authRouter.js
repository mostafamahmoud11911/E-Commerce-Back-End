import { Router } from "express";
import {
  changePassword,
  signin,
  signup,
} from "../controllers/authController.js";
import existEmail from "../middlewares/existEmail.js";
import { validate } from "../middlewares/validate.js";
import {
  changePasswordSchema,
  userLoginSchema,
  userSchema,
} from "../validations/uservalidation.js";

const authRouter = Router();

authRouter.post("/signup", validate(userSchema), existEmail, signup);
authRouter.post("/signin", validate(userLoginSchema), signin);
authRouter.patch(
  "/change-password",
  validate(changePasswordSchema),
  changePassword
);

export default authRouter;
