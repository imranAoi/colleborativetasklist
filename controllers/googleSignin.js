import jwt from "jsonwebtoken"; // Ensure imported
import User from "../models/userSchema.js"

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

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (err) {
    console.error("Google Signin Error:", err);
    res.status(500).json({ message: "Server error during Google Signin" });
  }
};

export default googleSignin;
