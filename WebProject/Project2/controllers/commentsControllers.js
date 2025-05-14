const { Comment, User } = require("../models/index");

const postComment = async (req, res) => {
  try {
    const usercomment = await Comment.create(req.body);
    res.status(201).json({message:"commented successfully", usercomment});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}
const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    console.log("comment >>>", comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

module.exports = { postComment, getComments };