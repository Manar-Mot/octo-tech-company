import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmed: boolean;
  image: string;
  role: string;
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