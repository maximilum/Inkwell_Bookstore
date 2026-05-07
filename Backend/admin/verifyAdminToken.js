const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, no token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access, you are not an admin",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token Validation Error: ", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Token validation failed" });
  }
};
module.exports = verifyAdminToken;
