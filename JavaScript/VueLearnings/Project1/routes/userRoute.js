const express = require("express");
const { getUser, addUser, updateUser, deleteUser } = require("../controllers/getUserController");

const userRoute = express.Router();

userRoute.get("/", getUser);
userRoute.post("/", addUser);
userRoute.patch("/", updateUser);
userRoute.delete("/", deleteUser);

module.exports = userRoute;