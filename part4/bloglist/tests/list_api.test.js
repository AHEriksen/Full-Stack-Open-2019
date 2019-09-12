const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
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

test('POST request successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'testblog',
    author: 'testperson',
    url: 'https://www.test.com',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');

  const blogs = await helper.blogsInDB();
  const titles = blogs.map(b => b.title);
  expect(blogs.length).toBe(helper.initialBlogs.length + 1);
  expect(titles).toContainEqual('testblog');
});

test('missing likes property gives default value of 0', async () => {
  const newBlog = {
    title: 'testblog',
    author: 'testperson',
    url: 'https://www.test.com'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');

  const blog = await Blog.find({ title: 'testblog', author: 'testperson', url: 'https://www.test.com' });
  expect(blog[0].likes).toBe(0);
});

test('bad request if title and url are missing from POST request', async () => {
  const blogMissing = {
    author: 'testperson',
  };

  await api
    .post('/api/blogs')
    .send(blogMissing)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});

describe('when there is initially on user in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: 'root', password: 'pw' });
    await user.save();
  });

  test('creation succeeds with unique username', async () => {
    const initialUsers = await helper.usersInDB();

    const newUser = {
      username: 'bj',
      name: 'bkljdkl jkjfdlsf',
      password: 'pw123'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const finalUsers = await helper.usersInDB();
    expect(finalUsers.length).toBe(initialUsers.length + 1);

    const usernames = finalUsers.map(fu => fu.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with dupe username', async () => {
    const initialUsers = await helper.usersInDB();

    const newUser = {
      username: 'root',
      name: 'rootman',
      password: 'namtoor'
    };

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(res.body.error).toContain('`username` to be unique');
    const finalUsers = await helper.usersInDB();
    expect(finalUsers.length).toBe(initialUsers.length);
  });

});