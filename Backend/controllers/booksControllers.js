const mongoose = require("mongoose");
const Book = require("../models/book.model");

const postABook = async (req, res) => {
  const book = req.body;
  try {
    const newBook = new Book(book);
    console.log(newBook);
    await newBook.save();
    return res
      .status(200)
      .json({ message: "book created successfully", data: newBook });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

exports.postABook = postABook;
