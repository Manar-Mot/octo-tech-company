import { getServerSession } from "next-auth";
import { nextauthOptions } from "../lib/nextAuth-options";

export async function getSession() {
    return await getServerSession();
  }