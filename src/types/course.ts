import mongoose from "mongoose";

export default interface Course{
    _id: mongoose.Types.ObjectId;
    title:string;
    description:string;
    isOnline:boolean;//online or inside center
}