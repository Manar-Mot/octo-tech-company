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
export interface Role {
    _id: string;
    certificate: Permission,
    course: Permission,
    role: Permission,
    adminDash: Permission,
    profile: Permission,
    user: Permission,
  }