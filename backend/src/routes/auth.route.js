import express from "express";
import { checkAuth, login, profile, signout, signup } from "../controllers/auth.js";
import { protectRoute } from "../middleware/protect.middlware.js";


const router =express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',signout);

router.put('/update-profile',protectRoute,profile);
router.get('/check',protectRoute,checkAuth);




export default router;