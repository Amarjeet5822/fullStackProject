const express = require("express");
const { Message, User } = require("../models");
const { Op } = require("sequelize");
const messageRoute = express.Router();

messageRoute.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    const message = await Message.create({ senderId, receiverId, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

messageRoute.get("recieve/:user1/:user2", async (req, res) => {
  try {
    const { user1Id, user2Id } = req.params;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: user1Id, receiverId: user2Id },
          { senderId: user2Id, receiverId: user1Id },
        ],
      },
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
module.exports = messageRoute;

