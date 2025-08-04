import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: {
    type: String,
    // password required only if user is NOT social login
  },

  firebaseUid: String, // for Google/Facebook users

  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
    default: "local",
  },

  photoURL: String,

  resetPasswordToken: String,
  resetPasswordExpires: Date,

  displayName: { type: String },
  usageType: { type: String, enum: ['own', 'friend'] },
  projectName: { type: String },
  hasCompletedOnboarding: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("User",user)