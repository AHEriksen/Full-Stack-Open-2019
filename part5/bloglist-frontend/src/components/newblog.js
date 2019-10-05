import React from 'react';
import { useField } from './../hooks';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const NewBlog = ({ setMessage, blogFormRef }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleCreation = async (event) => {
    event.preventDefault();

    const newBlog = { title: title.input.value, author: author.input.value, url: url.input.value };

    try {
      await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      const msg = { text: `a new blog ${title.input.value} by ${author.input.value} added`, success: true };
      setMessage(msg);
      setTimeout( () => { setMessage(null); }, 5000);
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

NewBlog.propTypes = {
  setMessage: PropTypes.func.isRequired
};

export default NewBlog;
