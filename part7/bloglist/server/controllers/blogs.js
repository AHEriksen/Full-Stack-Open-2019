const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 });
    response.json(blogs.map(blog => blog.toJSON()));
  }
  catch(exception) {
    next(exception);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findOne({ username: decodedToken.username });

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
  }
  catch(exception) {
    next(exception);
  }
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body;

  try {
    const blog = await Blog.findOne({ _id: request.params.id });
    blog.comments = blog.comments.concat(body.comment);
    await blog.save();
    response.json(blog.toJSON());
  }
  catch(exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const body = request.body;
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog.toJSON());
  }
  catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    console.log(request.token, decodedToken);
    if (!decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() !== decodedToken.id)
      return response.status(403).json({ error: 'blogs can only be deleted by the user who added them' });

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
  catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;