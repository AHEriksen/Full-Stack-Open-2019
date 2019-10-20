import React from 'react';
import { connect } from 'react-redux';
import { useField } from './../hooks';
import { setNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';

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
      <div>
        title <input {...title.input}/>
      </div>
      <div>
        author <input {...author.input}/>
      </div>
      <div>
        url <input {...url.input}/>
      </div>
      <button type="submit">create</button>

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
