import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/src/lib/mongodb";
import Message from "@/src/lib/models/Message";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "@/src/lib/nextAuth-options";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { name, email, message, language } = await req.json();
    if (!name || !email || !message || !language) {
      return NextResponse.json(
        { success: false, messageKey: "MissingRequiredFields" },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      name,
      email,
      message: {
        locale: language,
        text: message,
      },
    });
    await newMessage.save();

    return NextResponse.json(
      {
        success: true,
        messageKey: "MessageaddedSuccessfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { success: false, messageKey: "InternalServerError" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  const session = await getServerSession(nextauthOptions);

  if (!session || !session.user || session.user.role._id !== "Admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await Message.find();
    return NextResponse.json(
      { success: true, message: " تم جلب الرسائل بنجاح", messages: messages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, message: "خطأ داخلي في الخادم" },
      { status: 500 }
    );
  }
}
