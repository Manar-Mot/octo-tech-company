import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/src/lib/mongodb";
import User from "@/src/lib/models/User";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, otp } = await req.json();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, messageKey: "UserNotFound" },
        { status: 404 }
      );
    }

    if (user.otp !== otp) {
      return NextResponse.json(
        { success: false, messageKey: "InvalidOTP" },
        { status: 400 }
      );
    }

    if (new Date() > user.otpExpiry) {
      return NextResponse.json(
        { success: false, messageKey: "OTPExpired" },
        { status: 400 }
      );
    }

    user.confirmed = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { success: true, messageKey: "UserVerified" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { success: false, messageKey: "InternalServerError" },
      { status: 500 }
    );
  }
}
