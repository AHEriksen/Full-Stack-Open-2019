import React, { useState } from 'react';

const Blog = ({ blog, username, remove, increment }) => {
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
    <div onClick={handleDisplay} className='toggleOn'>{blog.title} {blog.author}</div>
  );

  const extraDisplay = () => (
    <>
      <div onClick={handleDisplay} className='toggleOff'>{blog.title} {blog.author}</div>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={() => increment(blog)}>like</button></div>
      <div>{`added by ${blog.user.name}`}</div>
      <button style={ { display: username === blog.user.username ? '' : 'none' }} onClick={() => remove(blog)}>remove</button>
    </>
  );

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {extraInfo ? extraDisplay() : standardDisplay()}
      </div>
    </div>);
};

export default Blog;