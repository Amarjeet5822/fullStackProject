const express = require("express");
const { User } = require("../models");
const userRoute = express.Router();

// for registering/updating socketId
userRoute.put("/update-socket", async (req, res) => {
  try {
    const { userId, socketId } = req.body;
    await User.update(
      { socketId, isOnline: true },
      { where: { id: userId } }
    );
    res.json({ message: "User socket updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRoute.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
module.exports = userRoute;