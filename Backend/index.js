const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connect_DB = require("./config/database.js");
const { booksRouter } = require("./routers/booksRouter");
const cors = require("cors");

dotenv.config();
PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/api/books/", booksRouter);
const init = async () => {
  await connect_DB();
  app.listen(PORT, () => {
    console.log("server started listening at port ", PORT);
  });
};

init();
