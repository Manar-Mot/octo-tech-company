"use server";
import { getServerSession } from "next-auth/next";
import { Account, Profile } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { nextauthOptions } from "../nextAuth-options";
import connectDB from "../mongodb";
import User from "../models/User";
import { getLocale } from "next-intl/server";
import { RoleModel } from "../models/Role";
export async function getUserSession() {
  const session = await getServerSession(nextauthOptions);
  return session;
}

interface ExtendedProfile extends Profile {
  picture?: string;
}

interface SignInWithOauthParams {
  account: Account;
  profile: ExtendedProfile;
}

export async function signInWithOauth({
  account,
  profile,
}: SignInWithOauthParams) {
  await connectDB();
  const locale = await getLocale();
  const user = await User.findOne({ email: profile.email });
  if (user) {
    if (!user.confirmed) {
      throw new Error("Account not confirmed");
    }
    return true;
  }
  const splitName = profile.name?.split(" ") || [];
  const firstName = splitName[0];
  const lastName = splitName.slice(1).join(" ");

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: profile.email,
    image: profile.picture,
    provider: account.provider,
    confirmed: true,
    locale: locale,
  });

  await newUser.save();
  return true;
}

interface GetUserByEmailParams {
  email: string;
}

export async function getUserByEmail({ email }: GetUserByEmailParams) {
  await connectDB();
  const user = await User.findOne({ email }).populate("role").select("-password");

  if (!user) {
    throw new Error("User does not exist!");
  }

  return { ...user.toObject(), _id: user._id.toString() };
}

export interface UpdateUserProfileParams {
  name: string;
}

export async function updateUserProfile({ name }: UpdateUserProfileParams) {
  const session = await getServerSession(nextauthOptions);
  // console.log(session)

  await connectDB();
  try {
    if (!session) {
      throw new Error("Unauthorization!");
    }

    const user = await User.findByIdAndUpdate(
      session?.user?._id,
      {
        name,
      },
      { new: true }
    ).select("-password");

    if (!user) {
      throw new Error("User does not exist!");
    }

    return { success: true };
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`);
  }
}

interface SignInWithCredentialsParams {
  email: string;
  password: string;
}



export async function signInWithCredentials({
  email,
  password,
}: SignInWithCredentialsParams) {
  try {
    await connectDB();
    const user = await User.findOne({ email }).populate("role");
    if (!user || !user.password) {
      throw new Error("Invalid email or password!");
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new Error("Invalid email or password!");
    }

    if (!user.confirmed) {
      throw new Error("Account not confirmed!");
    }
    const userObject = user.toObject();
    delete userObject.password;
    return { ...userObject, _id: user._id.toString() };
  } catch (error: any) {
    console.error("SignIn Error: ", error.message);
    throw new Error(error.message);
  }
}


export interface ChangeUserPasswordParams {
  oldPassword: string;
  newPassword: string;
}

export async function changeUserPassword({
  oldPassword,
  newPassword,
}: ChangeUserPasswordParams) {
  const session = await getServerSession(nextauthOptions);
  // console.log(session)

  await connectDB();
  console.log("=========after connect db");
  try {
    if (!session) {
      throw new Error("Unauthorization!");
    }

    if (session?.user?.provider !== "credentials") {
      throw new Error(
        `Signed in via ${session?.user?.provider}. Changes not allowed with this method.`
      );
    }
    console.log("=========before findById ");

    const user = await User.findById(session?.user?._id);
    console.log("=========after findById ");

    if (!user || !user.password) {
      throw new Error("User does not exist!");
    }

    const passwordIsValid = await bcrypt.compare(oldPassword, user.password);

    if (!passwordIsValid) {
      throw new Error("Incorrect old password.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`);
  }
}
