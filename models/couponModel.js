import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    expireCode: Date,
    disCount: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Coupon = model("Coupon", schema);

export default Coupon;
