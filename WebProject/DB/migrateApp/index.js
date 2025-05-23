const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({msg: "Hello, You are at homepage."});
});

app.listen(8080, ()=> console.log("app running at 8080"));
