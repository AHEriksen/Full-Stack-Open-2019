import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { addVote, removeBlog } from '../reducers/blogReducer';

const Blog = ({ blog, username, addVote, removeBlog, setNotification }) => {
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

  const handleRemoval = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      try {
        removeBlog(blog);
        const msg = {
          text: `the blog ${blog.title} by ${blog.author} was deleted`, success: true
        };
        setNotification(msg, 5);
      }
      catch (exception) {
        const msg = {
          text: 'deletion failed, unauthorized',
          success: false
        };
        setNotification(msg, 5);
      }
    }
  };

  const standardDisplay = () => (
    <div onClick={handleDisplay} className='toggleOn'>{blog.title} {blog.author}</div>
  );

  const extraDisplay = () => (
    <>
      <div onClick={handleDisplay} className='toggleOff'>{blog.title} {blog.author}</div>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={incrementLikes}>like</button></div>
      <div>{`added by ${blog.user.name}`}</div>
      <button style={ { display: username === blog.user.username ? '' : 'none' }} onClick={handleRemoval}>remove</button>
    </>
  );

  const incrementLikes = () => {
    try {
      addVote(blog);
      const msg = {
        text: `You voted for ${blog.title}`,
        success: true
      };
      setNotification(msg, 5);
    }
    catch (exception) {
      const msg = {
        text: 'Could not increment likes',
        success: false
      };
      setNotification(msg, 5);
    }
  };

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {extraInfo ? extraDisplay() : standardDisplay()}
      </div>
    </div>);
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

const mapDispatchToProps = {
  setNotification,
  addVote,
  removeBlog
};

const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog);
export default connectedBlog;