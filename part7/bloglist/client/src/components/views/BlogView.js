import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../../hooks';
import { addComment } from '../../reducers/blogReducer';

const BlogView = (props) => {
  const [comment, resetComment] = useField('text');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addComment(props.blog, comment.input.value);
    resetComment();
  };

  const commentForm = () => (
    <form onSubmit={handleSubmit}>
      <div>
        <input {...comment.input} />
        <button type='submit'>add comment</button>
      </div>
    </form>
  );

  if (props.blog === undefined)
    return null;
  else {
    return (
      <div>
        <h2>{props.blog.title}</h2>
        <a href={props.blog.url}>{props.blog.url}</a>
        <p>{props.blog.likes} likes <button onClick={() => props.increment(props.blog)}>like</button></p>
        <p>added by {props.blog.user.name}</p>
        <h3>comments</h3>
        {commentForm()}
        <ul>
          {props.blog.comments
            .map((comment, index) => <li key={index}>{comment}</li>)}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(blog => blog.id === ownProps.id)
  };
};

const mapDispatchToProps = {
  addComment: addComment
};

const connectedBlogView = connect(mapStateToProps, mapDispatchToProps)(BlogView);
export default connectedBlogView;