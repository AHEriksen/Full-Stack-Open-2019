import React, { useState } from 'react';
import { connect } from 'react-redux';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';

const Blog = (props) => {
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
    if (window.confirm(`remove blog ${props.blog.title} by ${props.blog.author}`)) {
      try {
        blogService.remove(props.blog);
      }
      catch (exception) {
        const msg = {
          text: 'Deletion failed, unauthorized?',
          success: false
        };
        props.setNotification(msg, 5);
      }
    }
  };

  const standardDisplay = () => (
    <div onClick={handleDisplay} className='toggleOn'>{props.blog.title} {props.blog.author}</div>
  );

  const extraDisplay = () => (
    <>
      <div onClick={handleDisplay} className='toggleOff'>{props.blog.title} {props.blog.author}</div>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>{props.blog.likes} likes <button onClick={incrementLikes}>like</button></div>
      <div>{`added by ${props.blog.user.name}`}</div>
      <button style={ { display: props.username === props.blog.user.username ? '' : 'none' }} onClick={handleRemoval}>remove</button>
    </>
  );

  const incrementLikes = () => {
    const newBlog = { ...props.blog };
    newBlog.likes = props.blog.likes + 1;
    try {
      blogService.update(newBlog);
    }
    catch (exception) {
      const msg = {
        text: 'Could not increment likes',
        success: false
      };
      props.setNotification(msg, 5);
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
  setNotification
};

const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog);
export default connectedBlog;