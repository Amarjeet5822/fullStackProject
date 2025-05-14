const express = require("express");
const { postBlog, getBlogs } = require("../controllers/blogsControllers");

const blogRoutes = express.Router();

blogRoutes.post("/", postBlog);
blogRoutes.get("/", getBlogs);
// blogRoutes.get("/:blogId", getSingleBlog);
// blogRoutes.put("/:blogId", updateBlog);
// blogRoutes.delete("/blogId", deleteBlog);



module.exports = blogRoutes;