const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Something something',
    author: 'Someone someone',
    url: 'https://www.twitter.com',
    likes: 5,
  },
  {
    title: 'thing thing',
    author: 'person person',
    url: 'https://www.nosuchthing.com',
    likes: 0
  },
  {
    title: 'PPP',
    author: 'sss',
    url: 'https://www.suchthing.com',
    likes: 7
  }
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs, blogsInDB
};