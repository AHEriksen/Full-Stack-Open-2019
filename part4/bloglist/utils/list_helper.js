const _ = require('lodash');

const dummy = () => 1;

const totalLikes = blogs => {
  const reducer = (sum, item) => sum + item.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null;

  const reducer = (most_liked, blog) => blog.likes > most_liked.likes ? blog : most_liked;
  return blogs.reduce(reducer);
};

const mostBlogs = blogs => {
  if (blogs.length === 0) return null;

  const obj = _.countBy(blogs, 'author');
  const max = _.maxBy(_.keys(obj), o => obj[o]);
  return { author: max, blogs: obj[max] };
};

const mostLikes = blogs => {
  if (blogs.length === 0) return null;

  const obj = _.groupBy(blogs, 'author');
  const max_likes =_.reduce(obj, (res, val, key) => {
    const acc = _.reduce(val, (sum, item) => sum + item.likes, 0);
    return acc > res.likes ? { author: key, likes: acc } : res;
  }, { likes: 0 });
  return max_likes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

