import { catchError } from "../middlewares/catchError.js";
import { Cart } from "../models/cartModel.js";
import Coupon from "../models/couponModel.js";
import Product from "../models/productModel.js";
import AppError from "../utils/AppError.js";

function calcTotalPrice(isCartExist) {
  isCartExist.totalCartPrice = isCartExist.cartItems.reduce(
    (prev, item) => (prev += item.quantity * item.price),
    0
  );

  if (isCartExist.disCount) {
    isCartExist.priceAfterDiscount =
      isCartExist.totalisCartExistPrice -
      (isCartExist.totalCartPrice * isCartExist.disCount) / 100;
  }
}

export const addToCart = catchError(async (req, res, next) => {
  const isCartExist = await Cart.findOne({ user: req.user.id });
  const product = await Product.findById(req.body.product);
  if (!product) return next(new AppError("product not found", 404));
  req.body.price = product.price;
  if (req.body.quantity > product.stock)
    return next(new AppError("Sold out", 404));
  if (!isCartExist) {
    const cart = new Cart({ user: req.user.id, cartItems: [req.body] });
    calcTotalPrice(cart);
    await cart.save();
    res.status(201).json({ message: "success", cart });
  } else {
    const item = isCartExist.cartItems.find(
      (item) => item.product == req.body.product
    );

    if (item) {
      item.quantity += req.body.quantity || 1;
      if (item.quantity >= product.stock) {
        return next(new AppError("Sold out", 404));
      }
    }
    if (!item) {
      isCartExist.cartItems.push(req.body);
    }

    calcTotalPrice(isCartExist);

    await isCartExist.save();

    res.json({ message: "success", cart: isCartExist });
  }
});

export const updateCart = catchError(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  const product = await Product.findById(req.params.id);
  const item = cart.cartItems.find((item) => item.product == req.params.id);
  if (!item) return next(new AppError("product not found"));
  item.quantity = req.body.quantity;

  if (req.body.quantity > product.stock)
    return next(new AppError("Sold out", 404));

  calcTotalPrice(cart);
  await cart.save();
  res.json({ message: "success", cart });
});

export const removeItemFromCart = catchError(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );
  calcTotalPrice(cart);

  cart || next(new AppError("cart not found", 404));
  !cart || res.json({ message: "delete success", cart });
});

export const getLoggedUserCart = catchError(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });

  cart || next(new AppError("cart not found", 404));
  !cart || res.json({ message: "delete success", cart });
});

export const clearUserCart = catchError(async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({ user: req.user.id });
  cart || next(new AppError("cart not found", 404));
  !cart || res.json({ message: "delete success", cart });
});

export const applyCoupon = catchError(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    code: req.body.code,
    expireCode: { $gte: Date.now() },
  });
  if (!coupon) return next(new AppError("Coupon is not valid", 404));
  const cart = await Cart.findOne({ user: req.user.id });

  calcTotalPrice(cart);

  cart.discount = coupon.disCount;
  await cart.save();
  res.json({ message: "success", cart });
});
