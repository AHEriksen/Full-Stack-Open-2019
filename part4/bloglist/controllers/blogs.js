const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs.map(blog => blog.toJSON()));
  } catch(error) {
    console.log(error);
  }
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  try {
    const savedBlog = await blog.save();
    response.json(savedBlog.toJSON());
  } catch(error) {
    console.log(error);
  }
});

module.exports = blogsRouter;