interface PermisionDetails {
  given: boolean;
  type: "All" | "Limited" | "Self";
}
interface Permission {
  GET: PermisionDetails;
  POST: PermisionDetails;
  PUT: PermisionDetails;
  DELETE: PermisionDetails;
}
export const TypeOfPrival = {
  Limited: "Limited",
  All: "All",
  Self: "Self",
};
export type Components =
  | "manageUsers"
  | "profile"
  | "manageblog"
  | "adminDash"
  | "manageMessages"
  | "managePartners"
  | "manageNews"
  | "settings"
  | "role";
export type ApiCall = "GET" | "POST" | "PUT" | "DELETE";

export interface Role {
  _id: string;
  manageUsers: Permission;
  manageblog: Permission;
  role: Permission;
  adminDash: Permission;
  profile: Permission;
  manageMessages: Permission;
  manageNews: Permission;
  managePartners: Permission;
  settings: Permission;
}
