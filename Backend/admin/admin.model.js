const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
