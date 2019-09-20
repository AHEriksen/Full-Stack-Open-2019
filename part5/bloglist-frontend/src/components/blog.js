import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
  const [extraInfo, setExtraInfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderwidth: 1,
    marginBottom: 5,
    backgroundColor: 'silver',
  };

  const handleDisplay = () => {
    setExtraInfo(!extraInfo);
  };

  const standardDisplay = () => (
    <div onClick={handleDisplay}>{blog.title} {blog.author}</div>
  );

  const extraDisplay = () => (
    <>
      <div onClick={handleDisplay}>{blog.title} {blog.author}</div>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={incrementLikes}>like</button></div>
      {`added by ${blog.user.name}`}
    </>
  );

  const incrementLikes = () => {
    const newBlog = { ...blog };
    newBlog.likes = blog.likes + 1;
    blogService.update(newBlog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {extraInfo ? extraDisplay() : standardDisplay()}
      </div>
    </div>);
};

export default Blog;