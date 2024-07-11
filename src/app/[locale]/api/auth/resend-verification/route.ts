

import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "@/src/lib/nodemailer/sendMail";
import connectDB from "@/src/lib/mongodb";
import User from "@/src/lib/models/User";
import { generateOTP } from '@/src/utils';

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, locale } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, messageKey: "UserNotFound" },
        { status: 404 }
      );
    }

    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    const newVerificationToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "10m" }
    );

    const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/${locale}/auth/request-verification?token=${newVerificationToken}`;
    await sendVerificationEmail(user.email, verificationUrl, locale, otp);

    return NextResponse.json(
      { success: true, messageKey: "ResendVerificationSuccess" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resending OTP:", error);
    return NextResponse.json(
      { success: false, messageKey: "InternalServerError" },
      { status: 500 }
    );
  }
}
