


const dummy = blogs => 1;

const totalLikes = blogs => {
  const reducer = (sum, item) => sum + item.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null;
  const reducer = (most_liked, blog) => blog.likes > most_liked.likes ? blog : most_liked;
  return blogs.reduce(reducer);
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};

