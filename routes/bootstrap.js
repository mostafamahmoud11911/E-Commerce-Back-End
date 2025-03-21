import categoryRouter from "./categoryRoutes.js";
import subCategoryRouter from "./subCategoryRoutes.js";
import brandRouter from "./brandRoutes.js";
import productRoutes from "./productRoutes.js";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import reviewRouter from "./reviewRouter.js";
import wishlistRouter from "./wishlistRouter.js";
import addressesRouter from "./addressRouter.js";
import couponRouter from "./couponRouter.js";
import cartRouter from "./cartRouter.js";
import orderRouter from "./orderRouter.js";

export const bootstrap = (app) => {
  app.use("/api/categories", categoryRouter);
  app.use("/api/subcategories", subCategoryRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/reviews", reviewRouter);
  app.use("/api/wishlists", wishlistRouter);
  app.use("/api/addresses", addressesRouter);
  app.use("/api/coupons", couponRouter);
  app.use("/api/carts", cartRouter);
  app.use("/api/orders", orderRouter);
};
