const { Blog } = require("../models/index");

const postBlog = async (req, res ) => {
  try {
    // console.log("req.body : ", req.body)
    const addBlog = await Blog.create(req.body);
    res.status(201).json({message:"Blog created Successfully", addBlog })
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

const getBlogs = async (req, res ) => {
  try{
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  }catch(error) {
    res.status(500).json({message:error.message});
  }
}

module.exports = { postBlog, getBlogs };