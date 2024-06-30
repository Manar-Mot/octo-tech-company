import mongoose from "mongoose";

export default interface Course{
    _id: mongoose.Types.ObjectId;
    name:string;
    course:Course;
   
}