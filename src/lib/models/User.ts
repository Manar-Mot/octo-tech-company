import { IUser } from "@/src/types/user";
import mongoose from "mongoose"

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  image: {
    type: String
  },
  isVerified: {
    type: Boolean
  },
  role: {
    type: String,
    ref:'Role',
    default: "user"
  },
  provider: {
    type: String,
    default: "credentials"
  }
}, { timestamps: true })

const User =  mongoose.models?.User || mongoose.model("User", userSchema);

export default User