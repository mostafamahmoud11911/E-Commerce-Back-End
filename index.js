import express from "express";
import db from "./utils/database.js";
import { bootstrap } from "./routes/bootstrap.js";
import { globalError } from "./middlewares/globalError.js";
import AppError from "./utils/AppError.js";
import "dotenv/config";
import cors from "cors";
import { catchError } from "./middlewares/catchError.js";
import Stripe from "stripe";
import { Cart } from "./models/cartModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
const stripe = new Stripe(
  "sk_test_51R5419ITLHpjXTKHqX3zUluiIGvY6CLpf8ymGYQVAKgXvIjBhCt6IQdn6YDAQDHzMMuwCaHzuLjtAj74Q8f8tfH400aHZzraQI"
);

const app = express();
const port = process.env.PORT || 3000;

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  catchError((req, res) => {
    const sig = req.headers["stripe-signature"].toString();

    let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_FCu6084YlP7GeDndxYckkHnUkRdJUNOj");

    let checkoutSession;
    if (event.type === "checkout.session.completed") {
      checkoutSession = event.data.object;
    }

    res.json({ message: "success", checkoutSession });
  })
);

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

bootstrap(app);

app.use("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.use("*", (req, res, next) => {
  next(new AppError(`route found ${req.originalUrl}`, 404));
});
app.use(globalError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
