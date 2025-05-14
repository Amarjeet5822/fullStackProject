const express = require("express");
const { postComment, getComments } = require("../controllers/commentsControllers");

const commentRoutes = express.Router();

commentRoutes.post("/", postComment);
commentRoutes.get("/", getComments)


module.exports = commentRoutes;