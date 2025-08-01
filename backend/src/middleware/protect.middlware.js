 import cookie from "cookie-parser";
 import jwt from "jsonwebtoken"
 import {User} from "../models/user.model.js"

 export const protectRoute=async(req,res,next)=>{

    try {
    const token=req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"Unauthorised-No token provided"})
    }
    
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

    if(!decoded){
        return res.status(401).json({message:"Unauthorised-No token"})
    }

    const user=await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(404).json({message:"Unauthorised-No User"})
    }

    req.user=user;
    next();
    } catch (error) {
        console.log("Internal error")
        return res.status(400).json({message:"Internal server error"})
    }
    


 };