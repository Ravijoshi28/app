import mongoose from "mongoose";

const userschema=new mongoose.Schema(
   { fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minlength:6,
    },
    profilePic:{
        type:String,
        default:""
    },},
    {timestamps:true}
);

export const User=mongoose.model("User",userschema);