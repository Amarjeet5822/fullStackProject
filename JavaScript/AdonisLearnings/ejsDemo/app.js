const express = require("express");
const ejs = require("ejs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// login
app.get("/", (req, res) => {
  res.render("login");
})

// dashboard
app.post("/dashboard", (req, res) => {
  const messages = ['Hello', 'How are you?', 'Welcome to the chat!']
  const { username} = req.body;
  res.render("dashboard", { username, messages})
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
})