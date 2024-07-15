import { Role } from "@/src/types/role";
import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
  given: { type: Boolean, default: false },
  type: { type: String, enum: ["All", "Self", "Limit"], default: "Self" },
});

const roleSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    manageUsers: {
      GET: PermissionSchema,
      POST: PermissionSchema,
      PUT: PermissionSchema,
      DELETE: PermissionSchema,
    },
    manageBlog: {
      GET: PermissionSchema,
      POST: PermissionSchema,
      PUT: PermissionSchema,
      DELETE: PermissionSchema,
    },
    role: {
      GET: PermissionSchema,
      POST: PermissionSchema,
      PUT: PermissionSchema,
      DELETE: PermissionSchema,
    },
    adminDash: {
      GET: PermissionSchema,
      POST: PermissionSchema,
      PUT: PermissionSchema,
      DELETE: PermissionSchema,
    },
    profile: {
      GET: PermissionSchema,
      POST: PermissionSchema,
      PUT: PermissionSchema,
      DELETE: PermissionSchema,
    },
    manageMessages: {
      GET: PermissionSchema,
      POST: PermissionSchema,
      PUT: PermissionSchema,
      DELETE: PermissionSchema,
    },
    manageNews: {
      GET: PermissionSchema,
      POST: PermissionSchema,
      PUT: PermissionSchema,
      DELETE: PermissionSchema,
    },
    managePartners: {
      GET: PermissionSchema,
      POST: PermissionSchema,
      PUT: PermissionSchema,
      DELETE: PermissionSchema,
    },
    settings: {
      GET: PermissionSchema,
      POST: PermissionSchema,
      PUT: PermissionSchema,
      DELETE: PermissionSchema,
    },
  },
  {
    timestamps: true,
  }
);

export const RoleModel =
  mongoose.models?.Role || mongoose.model<Role>("Role", roleSchema);

export const initRoles = [
  {
    _id: "Admin",
    manageUsers: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
    manageBlog: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
    role: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
    adminDash: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
    profile: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
    manageMessages: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
    manageNews: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
    managePartners: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
    settings: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
  },
  {
    _id: "Writer",
    manageUsers: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    manageBlog: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "Self" },
      PUT: { given: true, type: "Self" },
      DELETE: { given: true, type: "Self" },
    },
    role: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    adminDash: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    profile: {
      GET: { given: true, type: "Self" },
      POST: { given: true, type: "Self" },
      PUT: { given: true, type: "Self" },
      DELETE: { given: true, type: "Self" },
    },
    manageMessages: {
      GET: { given: true, type: "Self" },
      POST: { given: true, type: "Self" },
      PUT: { given: true, type: "Self" },
      DELETE: { given: true, type: "Self" },
    },
    manageNews: {
      GET: { given: true, type: "All" },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    managePartners: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    settings: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
  },
  {
    _id: "Editor",
    manageUsers: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    manageBlog: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
    role: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    adminDash: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    profile: {
      GET: { given: true, type: "Self" },
      POST: { given: true, type: "Self" },
      PUT: { given: true, type: "Self" },
      DELETE: { given: true, type: "Self" },
    },
    manageMessages: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
    manageNews: {
      GET: { given: true, type: "All" },
      POST: { given: true, type: "All" },
      PUT: { given: true, type: "All" },
      DELETE: { given: true, type: "All" },
    },
    managePartners: {
      GET: { given: true, type: "All" },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    settings: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
  },
  {
    _id: "User",
    manageUsers: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    manageBlog: {
      GET: { given: true, type: "All" },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    role: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    adminDash: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    profile: {
      GET: { given: true, type: "Self" },
      POST: { given: true, type: "Self" },
      PUT: { given: true, type: "Self" },
      DELETE: { given: true, type: "Self" },
    },
    manageMessages: {
      GET: { given: false },
      POST: { given: true, type: "Self" },
      PUT: { given: false },
      DELETE: { given: false },
    },
    manageNews: {
      GET: { given: true, type: "All" },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    managePartners: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
    settings: {
      GET: { given: false },
      POST: { given: false },
      PUT: { given: false },
      DELETE: { given: false },
    },
  },
];
