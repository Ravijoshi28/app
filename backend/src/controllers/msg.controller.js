import express from "express"
import { User } from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { Message } from "../models/msg.model.js";
import {getReceiverSocketId,io} from "../lib/socket.js"
export const getusersidebar=async (req,res)=>{

    try {
        const loggedinuser=req.user._id;
        const filteredid=await User.find({_id:{$ne:loggedinuser}}).select("-password");
   console.log("server running");
        res.status(200).json(
            filteredid
        )
    } catch (error) {
            console.log("server error",error);
          res.status(400).json({message:"not-fetched"});
    }
};

export const getmsgs=async(req,res)=>{

    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;

        const message=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId },
            {senderId:userToChatId,receiverId:myId},
        ]
    })
            res.status(200).json(message);
            
} catch (error) {
      
            res.status(200).json({message:"error in getmsg"});
    }
}

export const sendmsg=async(req,res)=>{

    try {
        const {text,image}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;

   
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        };
  const newMessage=new Message({
                senderId,
                receiverId,
                text,
                image:imageUrl
            })
        await newMessage.save();

        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
           
        res.status(200).json(newMessage);

    } catch (error) {
        console.log("msg sending error",error);
        res.status(200).json({message:"Msg sending is not done."})
    }
    

}
