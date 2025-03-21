import express from "express";
import {
  addAddress,
  getLoggedUserAdderess,
  removeAddress,
} from "../controllers/addressController.js";
import {
  authorization,
  productedRoute,
} from "../controllers/authController.js";

const addressesRouter = express.Router();

addressesRouter.patch("/", productedRoute, authorization("user"), addAddress);
addressesRouter.delete(
  "/:id",
  productedRoute,
  authorization("user"),
  removeAddress
);
addressesRouter.get(
  "/",
  productedRoute,
  authorization("user"),
  getLoggedUserAdderess
);

export default addressesRouter;
