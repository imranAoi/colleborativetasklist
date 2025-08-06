export const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction, // true on Render (HTTPS)
    sameSite: isProduction ? "None" : "Lax", // None required for cross-site
    maxAge: 3600000,
  });
};
