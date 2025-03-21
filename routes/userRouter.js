import { Router } from "express";

import { validate } from "../middlewares/validate.js";
import {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  getUserSchema,
  userSchema,
  userUpdateSchema,
} from "../validations/uservalidation.js";
import existEmail from "../middlewares/existEmail.js";
import orderRouter from "./orderRouter.js";

const userRouter = Router();

userRouter.use("/:user/orders", orderRouter);
userRouter.post("/", validate(userSchema), existEmail, addUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", validate(getUserSchema), getUser);
userRouter.put("/:id", validate(userUpdateSchema), updateUser);
userRouter.delete("/:id", validate(getUserSchema), deleteUser);

export default userRouter;
