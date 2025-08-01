import mongoose from "mongoose";

export const connectdb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoose connected ${conn.connection.host}`)
    }
    catch(error){
        console.log("mongoose error",error);
    }
};