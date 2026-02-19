const express = require("express");
const {
  postBook,
  getBook,
  getAllBooks,
  deleteBook,
  editBook,
} = require("../controllers/booksControllers");

// Create Router
const Router = express.Router();

Router.post("/", postBook);

Router.get("/:id", getBook);

Router.get("/", getAllBooks);

Router.delete("/:id", deleteBook);

Router.patch("/:id", editBook);
exports.booksRouter = Router;
