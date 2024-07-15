import { IUser } from "@/src/types/user";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    confirmed: {
      type: Boolean,
    },
    locale: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      ref: "Role",
    },
    provider: {
      type: String,
      default: "credentials",
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiry: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
