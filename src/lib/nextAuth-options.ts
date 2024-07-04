import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  signInWithOauth,
  getUserByEmail,
  signInWithCredentials,
} from "./actions/auth.actions";
import { getSession } from "next-auth/react";

export const nextauthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signIn",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid profile email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await signInWithCredentials({
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.type === "oauth" && profile) {
        return await signInWithOauth({ account, profile });
      }
      return true;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        token.name = session.name;
      } else {
        if (token.email) {
          const user = await getUserByEmail({ email: token.email });
          token.firstName = user.firstName;
          token.lastName = user.lastName;
          token._id = user._id;
          token.role = user.role;
          token.provider = user.provider;
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          firstName: token.firstName,
          lastName: token.lastName,
          _id: token._id,
          role: token.role,
          provider: token.provider,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      const session = await getServerSession();
      if (session?.user?.role === "Admin") {
        return baseUrl + "/admin";
      }
      return url || baseUrl;
    },
  },
};
