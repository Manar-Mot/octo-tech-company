import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ApiCall, Components } from "@/src/types/role";

const RequireAdmin = ({
  children,
  componentName,
  apiCall,
}: {
  children: React.ReactNode;
  componentName: Components;
  apiCall: ApiCall;
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/");
    }
  }, [session, status,router]);

  if (status === "loading" || !session) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default RequireAdmin;
