const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connect_DB = require("./config/database.js");

dotenv.config();
PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello world");
});
const init = async () => {
  await connect_DB();
  app.listen(PORT, () => {
    console.log("server started listening at port ", PORT);
  });
};

init();
