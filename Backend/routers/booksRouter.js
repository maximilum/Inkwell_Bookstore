const express = require("express");
const { postABook } = require("../controllers/booksControllers");

// Create Router
const Router = express.Router();

Router.post("/", postABook);

exports.booksRouter = Router;
