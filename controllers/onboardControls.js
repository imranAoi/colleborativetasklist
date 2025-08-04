// controllers/onboardingController.js
import User from '../models/userSchema.js'

export const saveOnboarding = async (req, res) => {
  const { displayName, usageType, projectName } = req.body;
  const userId = req.user.id; // extracted by verifyToken middleware

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        displayName,
        usageType,
        projectName,
        hasCompletedOnboarding: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Onboarding completed",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
