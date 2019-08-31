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
  const max = _.max(_.keys(obj), o => obj[o]);
  return { author: max, blogs: obj[max]};
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};

