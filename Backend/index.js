const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connect_DB = require("./config/database.js");
const { booksRouter } = require("./routers/booksRouter");
const ordersRouter = require("./routers/ordersRouter.js");
const adminRouter = require("./admin/admin.Route.js");
const imageUploadRouter = require("./features/Cloudinary/imageUpload.router.js");
const categoriesRouter = require("./routers/categoriesRouter.js");
const searchRouter = require("./routers/SearchBooksRouter.js");
const cors = require("cors");

// Enviroment Variables
dotenv.config();
PORT = process.env.PORT;

// API preprocess
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://inkwellbookstore.vercel.app",
    ],
    credentials: true,
  }),
);

//Routers
app.use("/api/books/", booksRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/images", imageUploadRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/search", searchRouter);

const init = async () => {
  await connect_DB();
  app.listen(PORT, () => {
    console.log("server started listening at port ", PORT);
  });
};

init();
