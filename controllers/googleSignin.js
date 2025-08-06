import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const googleSignin = async (req, res) => {
  try {
    const { name, email, firebaseUid, photo, provider } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        firebaseUid,
        photoURL: photo,
        provider: provider || "google",
      });
      await user.save();
    }

    // ✅ Create JWT
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    // ✅ Dynamic cookie settings for dev vs prod
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,       // true for HTTPS in production
      sameSite: isProduction ? "None" : "Lax", // None for cross-site
      maxAge: 3600000, // 1 hour
    });

    // ✅ Send user info only (token stays in cookie)
    res.json({ user });
  } catch (err) {
    console.error("Google Signin Error:", err);
    res.status(500).json({ message: "Server error during Google Signin" });
  }
};

export default googleSignin;
