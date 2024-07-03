import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import ContactMessage from '@/src/lib/models/ContactMessage';

export async function POST(req: NextRequest) {
  await connectDB();

  const { name, email, message, lang } = await req.json();

  try {
    const newContactMessage = new ContactMessage({
      name: { [lang]: name },
      email,
      message: { [lang]: message },
    });

    await newContactMessage.save();
    return NextResponse.json({ message: 'Message received successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
