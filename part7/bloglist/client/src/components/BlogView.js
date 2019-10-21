import React from 'react';
import { connect } from 'react-redux';

const BlogView = (props) => {
  if (props.blog === undefined)
    return null;
  else {
    return (
      <div>
        <h2>{props.blog.title}</h2>
        <a href={props.blog.url}>{props.blog.url}</a>
        <p>{props.blog.likes} likes <button onClick={() => props.increment(props.blog)}>like</button></p>
        <p>added by {props.blog.author}</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(blog => blog.id === ownProps.id)
  };
};

const connectedBlogView = connect(mapStateToProps)(BlogView);
export default connectedBlogView;