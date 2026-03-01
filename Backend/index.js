const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connect_DB = require("./config/database.js");
const { booksRouter } = require("./routers/booksRouter");
const ordersRouter = require("./routers/ordersRouter.js");
const cors = require("cors");

// Enviroment Variables
dotenv.config();
PORT = process.env.PORT;

// API preprocess
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//Routers
app.use("/api/books/", booksRouter);
app.use("/api/orders", ordersRouter);

const init = async () => {
  await connect_DB();
  app.listen(PORT, () => {
    console.log("server started listening at port ", PORT);
  });
};

init();
