import { Document } from "mongoose";
import { Role } from "./role";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified:boolean;
  image: string;
  role: string;
  provider: string;
}
