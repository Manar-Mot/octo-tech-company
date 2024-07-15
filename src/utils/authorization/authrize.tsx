import { ApiCall, Components, Role } from "@/src/types/role";

export const checkPermission = (role: Role, component: Components, action: ApiCall): boolean => {
  const permissions = role[component];
  return permissions[action].given;
};

