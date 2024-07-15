import { Document } from "mongoose";
import { Role } from "./role";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmed: boolean;
  image: string;
  role: Role;
  provider: string;
  locale: string;
  otp?: string;
  otpExpiry?: Date;
}
export interface SignUpValues{
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
}