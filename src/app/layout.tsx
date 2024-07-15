import { ReactNode } from "react";
import "./globals.css";
import ClientSessionProvider from "../components/sharedComponent/ClientSessionPro";
import { getUserSession } from "../lib/actions/auth.actions";

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default async function RootLayout({ children }: Props) {
  const session = await getUserSession();
  return (
    <ClientSessionProvider session={session}>{children}</ClientSessionProvider>
  );
}
