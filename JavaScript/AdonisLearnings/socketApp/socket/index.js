const { User, Message } = require("../models");
const { Server } = require("socket.io");
const moment = require("moment-timezone"); // ✅ for IST time

const setupSocket = (server) =>{
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    // ✅ Register user & update socketId and isOnline
    socket.on("register-user", async ({ userId, username }) => {
      try {
        await User.update(
          { socketId: socket.id, isBoolean: true },
          { where: { id: userId } }
        );
        console.log(`✅ User Registered: ${username} (ID: ${userId})`);
      } catch (err) {
        console.error("Error registering user:", err);
      }
    });

    // ✅ Handle sending messages
    socket.on("send-message", async ({ senderId, receiverId, content }) => {
      try {
        console.log("📤 Sending message:", { senderId, receiverId, content });

        // Get IST time
        const istTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

        // Save to DB
        const message = await Message.create({
          senderId,
          recieverId: receiverId, // 🛠️ Typo in model: should be `recieverId`
          content,
          timeStamp: istTime,
        });

        // Send to receiver if online
        const receiver = await User.findByPk(receiverId);
        if (receiver?.socketId) {
          io.to(receiver.socketId).emit("receive-message", message);
        }

        // Also send back to sender UI
        socket.emit("message-sent-confirm", message);
      } catch (err) {
        console.error("❌ Error sending message:", err);
      }
    });

    // ✅ Handle disconnection
    socket.on("disconnect", async () => {
      console.log("🔴 Socket disconnected:", socket.id);
      await User.update(
        { isBoolean: false, lastSeen: new Date(), socketId: null },
        { where: { socketId: socket.id } }
      );
    });
  });
};
