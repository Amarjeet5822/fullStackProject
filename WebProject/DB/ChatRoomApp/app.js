// const express = require("express");
// const app = express();
// const path = require("path");
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);
// const indexRoute = require("./routes/indexRoute");
// const chatHandler = require("./socket/chatHandler");

// app.use(express.static(path.join(__dirname, "public")));

// // Handler routes
// app.use(indexRoute);
// // Handle socket logic
// io.on("connection", (socket) => chatHandler(io, socket));

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile("flow.html");
});

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  // Send welcome only to that user
  socket.emit("welcome", `Welcome, your ID is ${socket.id}`);

  // Notify others someone joined
  socket.broadcast.emit("user-joined", `User ${socket.id} joined`);

  // Receive message from this client
  socket.on("chat-message", (msg) => {
    console.log(`💬 ${socket.id} says: ${msg}`);

    // Broadcast to everyone except sender
    socket.broadcast.emit("chat-message", `${socket.id}: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    io.emit("user-left", `User ${socket.id} left`);
  });
});

http.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
