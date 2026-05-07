const express = require("express");
const adminLoginController = require("./admin.controller.js");

const router = express.Router();
router.post("/", adminLoginController);

module.exports = router;
