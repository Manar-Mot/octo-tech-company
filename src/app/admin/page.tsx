
import {initRoles}  from '@/src/lib/models/Role'
import { RoleModel } from '@/src/lib/models/Role';
import connectDB from '@/src/lib/mongodb';
import mongoose from 'mongoose';
import React from 'react'
 const initializeRoles = async () => {
  try {
    await connectDB();
    const existingRoles = await RoleModel.find({});
    if (existingRoles.length === 0) {
      await RoleModel.insertMany(initRoles);
      console.log("Roles have been initialized.");
    } else {
      console.log("Roles already exist in the database.");
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
};
const AdminPage = async() => {
 
  return (
    <div className='h-[200vh]'>AdminPage</div>
  )
}

export default AdminPage