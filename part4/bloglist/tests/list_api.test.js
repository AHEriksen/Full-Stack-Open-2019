const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  helper.initialBlogs.forEach( async (blog) => {
    let blogObj = new Blog(blog);
    await blogObj.save();
    console.log('saved');
  });
  console.log('done');
});

test('GET request returns the correct amount of blogs in JSON format', async () => {
  const res = await api.get('/api/blogs');
  expect(res.body.length).toBe(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});