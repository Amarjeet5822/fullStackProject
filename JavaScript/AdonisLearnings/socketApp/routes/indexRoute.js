const express = require("express");
const userRoute = require("./userRoute");
const messageRoute = require("./messageRoute");

const indexRoute = express.Router();

indexRoute.use("/users", userRoute);
indexRoute.use("/messages", messageRoute);
module.exports = indexRoute;