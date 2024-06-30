import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/src/lib/mongodb';
import User from '@/src/lib/models/User';
import { IUser } from '@/src/types/user';
import { sendVerificationEmail } from '@/src/lib/nodemailer/sendMail';
import { generateOTP } from '@/src/utils';

export async function POST(req: NextRequest) {
    await connectDB();

    const { name, email, password,locale } = await req.json();

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: IUser = new User({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
        });
        // await newUser.save();
        const verificationToken = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '10m' }
        );
        const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/verify?token=${verificationToken}`;
        const verificationCode = generateOTP();
        await sendVerificationEmail(newUser.email, verificationUrl,locale,verificationCode);
        return NextResponse.json({ message: 'User registered. Please check your email to verify your account.' }, { status: 200 });
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
