import { NextRequest, NextResponse } from "next/server";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import connectDB from "@/src/lib/mongodb";
import User from "@/src/lib/models/User";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  console.log(token);
  try {
    const decodedToken: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );

    await connectDB();

    const user = await User.findOneAndUpdate(
      { _id: decodedToken.userId, email: decodedToken.email },
      { $set: { confirmed: true } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account verified successfully. You can now sign in.",
        user:user
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Verification token has expired. Please request a new verification link.",
        },
        { status: 400 }
      );
    }

    console.error("Error verifying token:", error);
    return NextResponse.json(
      { success: false, message: "Token verification failed" },
      { status: 500 }
    );
  }
}
