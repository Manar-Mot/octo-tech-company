import { Role } from "@/src/types/role";
import mongoose from "mongoose";
let Permission = {
  GET: {
    given: { type: Boolean, default: false },
    type: { type: String, enum: ["All", "Self", "Limit"] },
  },
  POST: {
    given: { type: Boolean, default: false },
    type: { type: String, enum: ["All", "Self", "Limit"] },
  },
  PUT: {
    given: { type: Boolean, default: false },
    type: { type: String, enum: ["All", "Self", "Limit"] },
  },
  DELETE: {
    given: { type: Boolean, default: false },
    type: { type: String, enum: ["All", "Self", "Limit"] },
  },
};
export const roleSchema = new mongoose.Schema<Role>(
  {
    _id: { type: String },
    adminDash: Permission,
    profile: Permission,
    user: Permission,
    role: Permission,
    certificate: Permission,
    course: Permission,
  },
  {
    timestamps: true,
  }
);

export const initroles: Role[] = [
  {
    _id: "Admin",
    adminDash: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    profile: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    user: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    certificate: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    course: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    role: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
  },
  {
    _id: "Student",
    adminDash: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    profile: {
      GET: {
        given: true,
        type: "Self",
      },
      POST: {
        given: true,
        type: "Self",
      },
      PUT: {
        given: true,
        type: "Limited",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    user: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    certificate: {
      GET: {
        given: true,
        type: "Self",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    course: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    role: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
  },
];
export default mongoose.model<Role>("Role", roleSchema);
