import express from 'express'
import {loginUser,signupUser,forgotPassword} from '../controllers/authControls.js'
import { verifyToken } from "../middleware/authMiddleware.js";
import { resetPassword } from "../controllers/resetPassword.js";
import googleSignin from '../controllers/googleSignin.js';
const router = express.Router()
router.post('/login',loginUser)
router.post('/signup',signupUser)
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You accessed protected route", user: req.user });
});

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google-login",googleSignin);



export default router 