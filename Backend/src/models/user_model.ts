import { Document, Schema } from "mongoose";
import mongoose from "mongoose";

const addressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      unique: true,
      index: true,
      trim: true,
      validate: [
        {
          validator: function (num: string) {
            const number = num.replace(/^0/, "");
            return /^[6-9]\d{9}$/.test(number);
          },
          message: `number is not valid`,
        },
        {
          validator: async function (this:Document, num: string) {
            const isExisted = await mongoose.models.User.findOne({
              contactNumber: num,
            });
            return !isExisted || isExisted._id?.equals(this._id);
          },
          message: `Contact number is already existed`,
        },
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email is invalid"],
      validate: {
        validator: async function (this: Document, email: string) {
          const isExisted = await mongoose.models.User.findOne({
            email: email,
          });
          return !isExisted || isExisted._id?.equals(this._id);
        },
        message: `Email is already existed`,
      },
    },
    addresses: [addressSchema],
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    otp: {
      type: Number,
    },
    otpExpire: {
      type: Date,
      index: { expires: 300 },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User",userSchema)