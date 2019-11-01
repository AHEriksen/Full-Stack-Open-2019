import React from 'react';
import { Typography } from '@material-ui/core';


const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderwidth: 1,
    marginBottom: 5,
    backgroundColor: 'silver',
  };

  const standardDisplay = () => (
    <Typography>{blog.title} {blog.author}</Typography>
  );

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {standardDisplay()}
      </div>
    </div>);
};

export default Blog;