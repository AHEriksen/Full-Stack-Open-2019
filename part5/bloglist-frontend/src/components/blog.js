import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, setMessage, username }) => {
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

  const handleRemoval = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      try {
        blogService.remove(blog);
      }
      catch (exception) {
        const msg = {
          text: 'Deletion failed, unauthorized?',
          success: false
        };
        setMessage(msg);
        setTimeout(() => { setMessage(null); }, 5000);
      }
    }
  };

  const standardDisplay = () => (
    <div onClick={handleDisplay}>{blog.title} {blog.author}</div>
  );

  const extraDisplay = () => (
    <>
      <div onClick={handleDisplay}>{blog.title} {blog.author}</div>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={incrementLikes}>like</button></div>
      <div>{`added by ${blog.user.name}`}</div>
      <button style={ { display: username === blog.user.username ? '' : 'none' }} onClick={handleRemoval}>remove</button>
    </>
  );

  const incrementLikes = () => {
    const newBlog = { ...blog };
    newBlog.likes = blog.likes + 1;
    try {
      blogService.update(newBlog);
    }
    catch (exception) {
      const msg = {
        text: 'Could not increment likes',
        success: false
      };
      setMessage(msg);
      setTimeout(() => { setMessage(null); }, 5000);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {extraInfo ? extraDisplay() : standardDisplay()}
      </div>
    </div>);
};

export default Blog;