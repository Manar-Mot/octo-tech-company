import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/src/lib/mongodb";
import User from "@/src/lib/models/User";
import { IUser } from "@/src/types/user";
import { sendVerificationEmail } from "@/src/lib/nodemailer/sendMail";
import { generateOTP } from "@/src/utils";

export async function POST(req: NextRequest) {
  await connectDB();
  const { firstName, lastName, email, password, locale } = await req.json();
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { success: false, messageKey: "UserAlreadyExists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
    const newUser: IUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmed: false,
      locale: locale,
      otp: otp,
      otpExpiry: otpExpiry,
    });
    const verificationToken = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "10m" }
    );

    const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/${locale}/auth/request-verification?token=${verificationToken}`;
    await sendVerificationEmail(newUser.email, verificationUrl, locale, otp);
    await newUser.save();

    // Remove sensitive data before sending user data in response
    const userResponse = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      confirmed: newUser.confirmed,
      locale: newUser.locale,
    };

    return NextResponse.json(
      { success: true, messageKey: "UserRegisteredCheckEmail", user: userResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { success: false, messageKey: "InternalServerError" },
      { status: 500 }
    );
  }
}
