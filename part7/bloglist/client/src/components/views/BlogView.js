import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../../hooks';
import { addComment } from '../../reducers/blogReducer';
import { IconButton, Input, List, ListItem, ListItemIcon, ListItemText, Link, Typography } from '@material-ui/core';
import { AddComment, Comment, ThumbUp } from '@material-ui/icons';

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
        <Input {...comment.input} />
        <IconButton type='submit' color='primary'>
          <AddComment>add comment</AddComment>
        </IconButton>
      </div>
    </form>
  );

  if (props.blog === undefined)
    return null;
  else {
    return (
      <div>
        <h2>{props.blog.title}</h2>
        <Link href={props.blog.url}>{props.blog.url}</Link>
        <Typography>{props.blog.likes} likes <IconButton onClick={() => props.increment(props.blog)}><ThumbUp /></IconButton></Typography>
        <Typography>added by {props.blog.user.name}</Typography>
        <h3>comments</h3>
        {commentForm()}
        <List>
          {props.blog.comments
            .map((comment, index) =>
              <ListItem key={index}>
                <ListItemIcon>
                  <Comment />
                </ListItemIcon>
                <ListItemText primary={comment} />
              </ListItem>
            )}
        </List>
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