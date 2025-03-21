import { catchError } from "../middlewares/catchError.js";
import { Cart } from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import AppError from "../utils/AppError.js";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51R46ZeBqAMghLALoebxctYb5J8R17y5h4PMfQ2o120ANzXzozdAmkjmyMmk1Ek8XKaK2F18ZsThSQq1yRPX22MRK00E9WrgIRa");

export const createCashOrder = catchError(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) next(new AppError("Cart is not found", 404));

  let totalOrderPrice = cart.totalCartPrice || cart.priceAfterDiscount;

  const order = new Order({
    user: req.user.id,
    orderItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
    isPaid: true,
    
  });

  const item = cart.cartItems.map((item) => ({
    updateOne: {
      filter: { _id: item.product },
      update: { $inc: { sold: item.quantity, stock: -item.quantity } },
    },
  }));

  await Product.bulkWrite(item);
  await order.save();
  await Cart.findByIdAndDelete(cart._id);
  res.status(201).json({ message: "success", order });
});

export const getUserOrders = catchError(async (req, res, next) => {
  let filterObj = {};
  if (req.params.user) {
    filterObj.user = req.params.user;
  } else {
    filterObj.user = req.user.id;
  }
  const order = await Order.find(filterObj)
    .populate("orderItems.product")
    .populate("user");

  order || next(new AppError("orders is not found", 404));
  !order || res.status(200).json({ message: "orders", order });
});

export const getAllOrders = catchError(async (req, res, next) => {
  const orders = await Order.find().populate("orderItems.product");
  orders || next(new AppError("orders is not found", 404));
  !orders || res.status(200).json({ message: "orders", orders });
});

export const createCheckoutSession = catchError(async (req, res, next) => {

  const cart = await Cart.findById(req.params.id);
  if (!cart) next(new AppError("Cart is not found", 404));
  

  let totalOrderPrice = cart.totalCartPrice || cart.priceAfterDiscount;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "AED",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });

  res.json({ message: "success", session });
});
