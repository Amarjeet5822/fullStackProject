const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("You are at home page");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {console.log("App running http://localhost:8080")});