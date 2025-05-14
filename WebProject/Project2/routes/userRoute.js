const express = require("express");
const { addUser, getUser, getSingleUser, updateUser, deleteUser } = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.post("/", addUser);
userRoutes.get("/", getUser);
userRoutes.get("/:userId", getSingleUser);
userRoutes.put("/:userId", updateUser);
userRoutes.delete("/:userId", deleteUser);

module.exports = userRoutes;