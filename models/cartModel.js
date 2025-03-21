import { model, Schema } from "mongoose";

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  cartItems: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      price: Number
    },
  ],
  totalCartPrice: Number,
  discount: Number,
  priceAfterDiscount: Number,
},{
    timestamps: true,
    versionKey: false
});

export const Cart = model("Cart", schema);
