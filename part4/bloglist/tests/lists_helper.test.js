const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of large list is correct', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });

  test('of list with 1 element equals likes of that element', () => {
    const result = listHelper.totalLikes(blogs.slice(1,2));
    expect(result).toBe(5);
  });

  test('of empty list is correct', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});

describe('favorite blog', () => {
  test('amongst many is correct', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });

  test('from a list of only one blog is that blog', () => {
    const result = listHelper.favoriteBlog(blogs.slice(1,2));
    expect(result).toEqual(blogs[1]);
  });

  test('from a list of zero blogs is null', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual(null);
  });
});

describe('author with most blogs', () => {
  test('from a list of one', () => {
    const result = listHelper.mostBlogs(blogs.slice(1,2));
    const answer = { author: 'Edsger W. Dijkstra', blogs: 1 };
    expect(result).toEqual(answer);
  });

  test('from a list of many blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    const answer = { author: 'Robert C. Martin', blogs: 3 };
    expect(result).toEqual(answer);
  });

  test('from an empty list of blogs', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual(null);
  });
});

describe('author with most likes', () => {
  test('from a list of many blogs', () => {
    const result = listHelper.mostLikes(blogs);
    const answer = { author: 'Edsger W. Dijkstra', likes: 17 };
    expect(result).toEqual(answer);
  });

  test('from an empty list of blogs', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual(null);
  });

  test('from a list of one blog', () => {
    const result = listHelper.mostLikes(blogs.slice(3,4));
    const answer = { author: 'Robert C. Martin', likes: 10 };
    expect(result).toEqual(answer);
  });
});

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];
