// packages
const express = require( "express");
const path = require("path");
const app = express();
const http = require('http');
const indexRoute = require("./routes/indexRoute");
const server = http.createServer(app);
const setupSocket = require("./socket/index");
const cors = require("cors");
const { Server } = require("socket.io");

// app.use(cors());
// // Socket connection
// setupSocket(server);
// // Global route
// app.use(indexRoute);

// app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.use(express.static("public"));
const io = new Server(server, {
  cors: {
    origin: "*",  // allow all origins (change in production)
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join Room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  // Send Message to Room
  socket.on('send_message', (data) => {
    // data = { room: "roomId", message: "Hello", sender: "John" }
    console.log("data from 3rd room", data);
    // send message to all except sender
    socket.to(data.room).emit('receive_message', data);
    // send message to all including sender
    io.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
// Start the server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});