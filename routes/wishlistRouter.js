import {
  authorization,
  productedRoute,
} from "../controllers/authController.js";
import {
  addTowishlist,
  getLoggedUserWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

import { Router } from "express";
const wishlistRouter = Router();

wishlistRouter.patch("/", productedRoute, authorization("user"), addTowishlist);
wishlistRouter.delete(
  "/:id",
  productedRoute,
  authorization("user", "admin"),
  removeFromWishlist
);
wishlistRouter.get("/", productedRoute, authorization("user"), getLoggedUserWishlist)

export default wishlistRouter;
