import express from "express"
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup =async (req,res)=>{
    const {fullName,email,password}=req.body;
   
    try{   
            if(!fullName || !email ||!password){
                return res.status(400).json({message:"All the crediential are not filled"});
            }


        if(password.length<6){
            return res.status(400).json({message:"Password must be lonegr than 6 character"});
        }


        const user=await User.findOne({email});
            if(user){
                return res.status(400).json({message:"User already exist"})
            }

            //hashing pass

            const salt=await bcrypt.genSalt(10);
            const hashedpass=await bcrypt.hash(password,salt);

            const newuser=new User({
                fullName,
                email,
                password:hashedpass
            })

            if(newuser){
               
              
                    await newuser.save(); 
                    generateToken(newuser._id,res)  
                 res.status(201).json(
                    {
                        _id:newuser._id,
                        fullName:newuser.fullName,
                        email:newuser.email,
                       profilePicc:newuser.profilePic
                    }
                 )
                 
                }
            else{
                res.status(400).json({message:"Invalid data cannot registered"});
            }


    }

    catch(error){
             console.log("Error in Signing in", error.message);
             res.status(500).json({ message: "Server error during signup" });
    }
}


export const login =async(req,res)=>{
    const {email,password}=req.body

    try{
            const user=await User.findOne({email});

            if(!user) return res.status(400).json({mesage:"Invalid Credentials"});

            const ispass=await bcrypt.compare(password,user.password)
    
        if(!ispass) {
           return res.status(400).json({mesage:"Invalid Credentials"});
        }

        generateToken(user._id,res);

        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })

        }
    catch(error){
            console.log("Credits error",error);
            return res.status(500).json({mesage:"internal error"});
    }
    
}

export const signout =(req,res)=>{

    try{
            res.cookie("jwt","",{maxage:0})
              return res.status(200).json({message:"User Succesfully logout"});
    }
    catch(error){
        return res.status(500).json({message:"Internal Server error"});
    }
   
    
}

export const profile=async (req,res)=>{

    try {
        const {profilePic}=req.body;
      const userId= req.user._id;
      if(!profilePic){
        return res.status(400).json({message:"no pic"})
      }

      const uploadpic=await cloudinary.uploader.upload(profilePic)
      const updateduser=await User.findByIdAndUpdate(userId,{profilePic:uploadpic.secure_url},{new:true})
      res.status(200).json({message:"Profile-pic updated"});
    } catch (error) {
        console.log("This is a server error",error);
        res.status(400).json({message:"Server Error"});
    }
}

 export const checkAuth=(req,res)=>{

    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("server in server",error);
        res.status(400).json({message:"server error"});
    }
 }