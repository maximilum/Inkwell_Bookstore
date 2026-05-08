const express = require("express");
const upload = require("./multer.middleware");
const cloudinary = require("./Cloudinary");

const route = express.Router();

route.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please provide an image" });
  }
  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "BookCovers",
      public_id: req.file.originalname.split(".")[0],
      overwrite: false,
      transformation: [
        { width: 720, height: 1000, crop: "fit" },
        { quality: "auto:best" },
      ],
      tags: ["book", "cover"],
    },
    (error, result) => {
      if (error)
        return res.status(400).json({ message: "error uploading image" });
      return res.status(200).json({
        message: "image uploaded successfully",
        url: result.secure_url,
      });
    },
  );
  stream.end(req.file.buffer);
});

module.exports = route;
