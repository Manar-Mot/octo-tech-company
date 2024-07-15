"use client"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { checkPermission } from "@/src/utils/authorization/authrize";
import { Role } from "@/src/types/role";
import { PermissionDeniedError } from "@/src/lib/errors/PermissionDeniedError";

const ManageUsers = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") return;

    const userRole = session?.user?.role;

    if (!userRole || !checkPermission(userRole, "manageUsers", "GET")) {
      throw new PermissionDeniedError("Access Denied");
    }
  }, [session, status]);
  return <div>ManageUsers</div>;
};

export default ManageUsers;
