const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("A user connected >> socket >> ", socket);
  // console.log("A user connected >> socket >> ", socket);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  console.log("filePath >>", filePath);
  res.sendFile(filePath);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
