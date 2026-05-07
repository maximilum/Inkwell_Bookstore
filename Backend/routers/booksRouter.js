const express = require("express");
const {
  postBook,
  getBook,
  getAllBooks,
  deleteBook,
  editBook,
} = require("../controllers/booksControllers");
const verifyAdminToken = require("../admin/verifyAdminToken.js");

// Create Router
const Router = express.Router();

Router.post("/", verifyAdminToken, postBook);

Router.get("/:id", getBook);

Router.get("/", getAllBooks);

Router.delete("/:id", verifyAdminToken, deleteBook);

Router.patch("/:id", verifyAdminToken, editBook);
exports.booksRouter = Router;
