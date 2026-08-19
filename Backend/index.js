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
const PORT = process.env.PORT || 5000;

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

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Inkwell Bookstore API is running",
  });
});

// Database connection middleware for serverless requests
app.use(async (req, res, next) => {
  try {
    await connect_DB();
    next();
  } catch (error) {
    next(error);
  }
});

// Routers
app.use("/api/books/", booksRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/images", imageUploadRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/search", searchRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start local server if run directly
if (require.main === module) {
  const init = async () => {
    try {
      await connect_DB();
      app.listen(PORT, () => {
        console.log("server started listening at port ", PORT);
      });
    } catch (err) {
      console.error("Failed to start local server:", err);
    }
  };

  init();
}

module.exports = app;

