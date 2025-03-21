import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    comment: String,
    rate: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.pre(/^find/, function () {
  this.populate("user").populate("product");
});

const Review = model("Review", schema);

export default Review;
