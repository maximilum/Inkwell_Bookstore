const mongoose = require("mongoose");
const Book = require("../models/book.model");

const postBook = async (req, res) => {
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

const getBook = async (req, res) => {
  const id = req.params.id;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `server error: ${error.message}` });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    if (!books) {
      return res
        .json(404)
        .json({ success: true, message: "No books were found" });
    }
    return res.status(200).json({ success: true, data: books });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  const id = req.params.id;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  try {
    const deletedBook = await Book.findByIdAndDelete(id, { new: true });
    if (!deletedBook) {
      return res
        .status(404)
        .json({ success: false, message: "book not found" });
    }
    return res.status(200).json({ success: true, data: deletedBook });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const editBook = async (req, res) => {
  const update = req.body;
  const id = req.params.id;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, update, { new: true });
    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "book not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "book updated", data: updatedBook });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.postBook = postBook;
exports.getBook = getBook;
exports.getAllBooks = getAllBooks;
exports.deleteBook = deleteBook;
exports.editBook = editBook;
