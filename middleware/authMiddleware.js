import jwt from "jsonwebtoken"; // ✅ Required
// import any other middleware/tools if needed

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log("🔐 Token received:", token);

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);
    req.user = { _id: decoded._id || decoded.id };
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(403).json({ error: "Invalid token" });
  }
};
