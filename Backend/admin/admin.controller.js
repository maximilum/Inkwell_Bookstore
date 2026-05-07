const Admin = require("./admin.model.js");
const jwt = require("jsonwebtoken");

const adminLoginController = async (req, res) => {
  const { adminName, password } = req.body;
  try {
    const admin = await Admin.findOne({ adminName });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized access" });
    }
    if (admin.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "invalid credentials" });
    }
    // Create JWT token
    const token = jwt.sign(
      { adminName: admin.adminName, role: admin.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" },
    );

    return res
      .status(200)
      .json({ success: true, message: "Admin Logged In", token });
  } catch (error) {
    console.log("Database Error: ", error);
    res.status(503).json({ success: false, message: error.message });
  }
};

module.exports = adminLoginController;
