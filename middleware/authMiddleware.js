import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // ✅ Only from HTTP-only cookie

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded._id }; // ✅ Attach user ID
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
