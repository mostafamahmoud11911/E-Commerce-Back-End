import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: true,
    },
    passwordChangedAt: Date,
    otp: String,
    expireOtp: Date,
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    wishlist: [{ type: Schema.ObjectId, ref: "Product" }],
    addresses: [{ city: String, phone: String, street: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

const User = model("User", schema);

export default User;
