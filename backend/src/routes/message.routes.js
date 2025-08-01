import express, { Router } from "express"

import { protectRoute } from "../middleware/protect.middlware.js";
import {getmsgs, getusersidebar, sendmsg} from "../controllers/msg.controller.js";

const router=express.Router();

router.get('/user',protectRoute,getusersidebar);
router.get('/user/:id',protectRoute,getmsgs);

router.post("/send/:id",protectRoute,sendmsg);

export default router;