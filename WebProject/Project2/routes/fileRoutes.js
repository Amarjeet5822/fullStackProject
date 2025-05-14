const express = require("express");
const multer = require("multer");
const path = require("path");

const fileRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() *1000);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

fileRoutes.post("/upload", (req, res) => {
  try {
    upload.single("file")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ error: "Image size should not exceed 2MB" });
        }
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: "Something went wrong!", err });
      } else {
        res.json({ message: "File uploaded successfully!" });
      }
    });
  } catch (error) {
    return res.status(500).json({ err: "Something went wrong!", error });
  }
});

module.exports = fileRoutes;

