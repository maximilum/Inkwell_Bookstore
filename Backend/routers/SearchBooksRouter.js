const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");

router.get("/", async (req, res) => {
  const search = req.query.search || "";

  try {
    const books = await Book.find({ title: { $regex: search, $options: "i" } });
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
