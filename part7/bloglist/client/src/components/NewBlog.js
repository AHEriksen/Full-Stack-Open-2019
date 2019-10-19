import React from 'react';
import { connect } from 'react-redux';
import { useField } from './../hooks';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';

const NewBlog = (props) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleCreation = async (event) => {
    event.preventDefault();

    const newBlog = { title: title.input.value, author: author.input.value, url: url.input.value };

    try {
      await blogService.create(newBlog);
      props.blogFormRef.current.toggleVisibility();
      const msg = { text: `a new blog ${title.input.value} by ${author.input.value} added`, success: true };
      props.setNotification(msg, 5);
      title.reset(); author.reset(); url.reset();
    }
    catch (exception) {
      console.log(exception);
    }
  };

  return (
    <form onSubmit={handleCreation}>
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
  setNotification
};

const connectedNewBlog = connect(mapStateToProps, mapDispatchToProps)(NewBlog);
export default connectedNewBlog;
