import bcrypt from 'bcryptjs'
import User from '../models/userSchema.js'
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const loginUser= async(req,res)=>{
   const { email,password}=req.body

    try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
}
export const signupUser= async(req,res)=>{
   const { name,email,password}=req.body
   
    try{
        const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword= await bcrypt.hash(password,10)
    const newUser=new User({
      name,
      email,
      password:hashedPassword
    })
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: { name, email } });
    }catch(error){
       res.status(500).json({ message: "Signup failed" });
    }
}


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // generate token
    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    // send email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your SMTP provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      text: `You are receiving this because you requested a password reset.\n\n
Please click the following link, or paste it in your browser to reset your password:\n\n
http://localhost:3000/reset-password/${token}\n\n
If you did not request this, please ignore this email.\n`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending reset email" });
  }
};
