import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface User {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    provider: string;
    email: string;
  }

  interface Session {
    user?: {
      _id: string;
      firstName: string;
      lastName: string;
      role: string;
      provider: string;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    provider: string;
    email: string;
  }
}
