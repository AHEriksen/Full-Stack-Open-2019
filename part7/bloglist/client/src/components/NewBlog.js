import React from 'react';
import { connect } from 'react-redux';
import { useField } from './../hooks';
import { setNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';
import { Input, InputLabel, IconButton, FormControl } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

const NewBlog = (props) => {
  const [title, resetTitle] = useField('text');
  const [author, resetAuthor] = useField('text');
  const [url, resetUrl] = useField('text');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleCreation({ title: title.input.value, author: author.input.value, url: url.input.value });
    resetTitle(); resetAuthor(); resetUrl();
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel>title</InputLabel> <Input {...title.input}/>
      <InputLabel>author</InputLabel> <Input {...author.input}/>
      <InputLabel>url</InputLabel> <Input {...url.input}/>
      <IconButton type="submit">
        <AddBox />
      </IconButton>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

const mapDispatchToProps = {
  setNotification,
  createBlog
};

const connectedNewBlog = connect(mapStateToProps, mapDispatchToProps)(NewBlog);
export default connectedNewBlog;
