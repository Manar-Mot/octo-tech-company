import { NextRequest, NextResponse } from "next/server";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import connectDB from "@/src/lib/mongodb";
import User from "@/src/lib/models/User";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  try {
    const decodedToken: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );

    await connectDB();

    const user = await User.findOne(
      { _id: decodedToken.userId, email: decodedToken.email }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, messageKey: "UserNotFound" },
        { status: 404 }
      );
    }

    if (user.confirmed) {
      return NextResponse.json(
        { success: false, messageKey: "UserAlreadyConfirmed" },
        { status: 400 }
      );
    }

    user.confirmed = true;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        messageKey: "AccountVerifiedSuccess",
        user: user
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json(
        {
          success: false,
          messageKey: "TokenExpired",
        },
        { status: 400 }
      );
    }

    console.error("Error verifying token:", error);
    return NextResponse.json(
      { success: false, messageKey: "TokenVerificationFailed" },
      { status: 500 }
    );
  }
}
