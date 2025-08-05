import express from 'express'
import {loginUser,signupUser,forgotPassword} from '../controllers/authControls.js'
import { verifyToken } from "../middleware/authMiddleware.js";
import { resetPassword } from "../controllers/resetPassword.js";
import googleSignin from '../controllers/googleSignin.js';
import { saveOnboarding } from "../controllers/onboardControls.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskControls.js";
const router = express.Router()
router.post('/login',loginUser)
router.post('/signup',signupUser)
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You accessed protected route", user: req.user });
});
router.get("/validate-session", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Session valid",
    user: req.user,
  });
});

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google-login",googleSignin);
router.post("/save-onboarding", verifyToken, saveOnboarding);

router.post("/tasks", verifyToken, createTask);      // Create
router.get("/tasks/", verifyToken, getTasks);         // Read
router.put("/tasks/:id", verifyToken, updateTask);    // Update
router.delete("/tasks/:id", verifyToken, deleteTask); // Delete


export default router 