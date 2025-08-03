import express, { Router } from "express"

import { protectRoute } from "../middleware/protect.middlware.js";
import {getmsgs, getusersidebar, sendmsg} from "../controllers/msg.controller.js";

const router=express.Router();

router.get('/user',protectRoute,getusersidebar);

try{
router.get('/user/:id',protectRoute,getmsgs); }
catch{
    console.log("error in message getmsg route");
}

try{
router.post("/send/:id",protectRoute,sendmsg);}
catch{
  
    console.log("error in sendmsg route");
}
}

export default router;
