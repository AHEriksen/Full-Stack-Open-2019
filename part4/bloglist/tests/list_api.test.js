const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjs = helper.initialBlogs
    .map(blog => new Blog(blog));
  const promiseArray = blogObjs.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('GET request returns the correct amount of blogs in JSON format', async () => {
  const res = await api.get('/api/blogs');
  expect(res.body.length).toBe(helper.initialBlogs.length);
});

test('unique identifier property of blog posts is named "id"', async () => {
  const blogs = await helper.blogsInDB();
  expect(blogs[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});