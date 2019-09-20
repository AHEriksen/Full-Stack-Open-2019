import React, { useState } from 'react';

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
      <a href={blog.url}>{blog.url}</a> <br/>
      {blog.likes} <br/>
      {`added by ${blog.user.name}`}
    </>
  )

  return (
    <div style={blogStyle}>
      <div>
        {extraInfo ? extraDisplay() : standardDisplay()}
      </div>
    </div>);
};

export default Blog;