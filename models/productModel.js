import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
      unique: [true, "product name is unique"],
    },
    slug: {
      type: String,
      required: [true, "product name is required"],
      unique: [true, "product name is unique"],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minLength: 30,
      maxLength: 2000,
    },
    imageCover: {
      type: String,
    },
    images: [String],
    price: {
      type: Number,
      min: 0,
      required: [true, "Price is required"],
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      min: 0,
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: Schema.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: Schema.ObjectId,
      ref: "Brand",
    },
    sold: Number,
    rateAvg: {
      type: Number,
      min: 0,
      max: 5,
    },
    rateCount: {
      type: Number,
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
  }
);

schema.virtual("Review", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

schema.pre("findOne", function () {
  this.populate("Review");
});

schema.post("init", (doc) => {
  if (doc.imageCover)
    doc.imageCover = `http://localhost:3000/uploads/products/${doc.imageCover}`;
  if (doc.images)
    doc.images = doc.images.map((image) => {
      return `http://localhost:3000/uploads/products/${image}`;
    });
});

const Product = model("Product", schema);

export default Product;
