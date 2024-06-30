import Course from "@/src/types/course";
import mongoose, { Schema } from "mongoose";


const CourseSchema: Schema = new Schema<Course>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isOnline: { type: Boolean, required: true },
  });
  
  export default  mongoose.model<Course>('Course', CourseSchema);