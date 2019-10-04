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

    const newBlog = { title: title.value, author: author.value, url: url.value };

    try {
      await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      const msg = { text: `a new blog ${title.value} by ${author.value} added`, success: true };
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
        title <input {...title}/>
      </div>
      <div>
        author <input {...author}/>
      </div>
      <div>
        url <input {...url}/>
      </div>
      <button type="submit">create</button>

    </form>
  );
};

NewBlog.propTypes = {
  setMessage: PropTypes.func.isRequired
};

export default NewBlog;
