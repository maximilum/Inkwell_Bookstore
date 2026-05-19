const express = require("express");
const Book = require("../models/book.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Book.distinct("category");
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: [] });
  }
});

module.exports = router;
