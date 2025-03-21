import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "Category name is already taken"],
      required: [true, "Category name is required"],
      trim: true,
      minLength: [3, "Category name must be at least 3 characters long"],
    },
    slug: {
      type: String,
      unique: [true, "slug name is already taken"],
      lowercase: true,
      required: [true, "Category slug is required"],
    },
    image: {type: String},
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
   if(doc.image) doc.image = `http://localhost:3000/uploads/categories/${doc.image}`;
});

const Category = mongoose.model("Category", schema);

export default Category;
