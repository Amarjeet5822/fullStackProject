const express = require("express");
const { uploadFile, deleteFile } = require("../controllers/fileController");

const indexRoute = express.Router();

indexRoute.post("/upload", uploadFile);
indexRoute.delete("/delete/:key", deleteFile);

module.exports = indexRoute;