import { nextauthOptions } from "@/src/lib/nextAuth-options"
import NextAuth from "next-auth"


const handler = NextAuth(nextauthOptions)

export { handler as GET, handler as POST }