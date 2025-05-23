const express = require("express");
const path = require("path");
const indexRoute = express.Router();

indexRoute.get("/index", (req, res) => {
  console.log("__dirname", __dirname);
  // res.sendFile(path.join(__dirname, "../public/index.html"));
  res.sendFile("index.html")
});

module.exports = indexRoute;
