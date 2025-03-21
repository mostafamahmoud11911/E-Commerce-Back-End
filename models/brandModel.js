import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "brand name is required"],
    },
    slug: {
      type: String,
      unique: [true, "slug name is already taken"],
      lowercase: true,
      required: [true, "Category slug is required"],
    },
    logo: {
      type: String,
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.post("init", (doc) => {
  doc.logo = `http://localhost:3000/uploads/brands/${doc.logo}`;
});

const Brand = model("Brand", schema);

export default Brand;
