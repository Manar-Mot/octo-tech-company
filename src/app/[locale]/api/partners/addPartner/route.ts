import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import Partner from '@/src/lib/models/partners';

export async function POST(req: NextRequest) {
  console.log("==============manar")
  await connectDB();

  const { companyName, email } = await req.json();

  try {
    const newPartner = new Partner({
      companyName,
      email,
      status: 'pending',
    });

    await newPartner.save();
    return NextResponse.json({ message: 'Partnership request added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding partnership request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
}
