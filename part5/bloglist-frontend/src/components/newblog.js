import React, { useState } from 'react';
import blogService from '../services/blogs';

const NewBlog = ({ setMessage, blogFormRef }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const setProperty = (property, value) => {
    const updatedBlog = { ...newBlog };
    updatedBlog[property] = value;
    setNewBlog(updatedBlog);
  };

  const handleCreation = async (event) => {
    event.preventDefault();

    try {
      await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      const msg = { text: `a new blog ${newBlog.title} by ${newBlog.author} added`, success: true };
      setMessage(msg);
      setTimeout( () => { setMessage(null); }, 5000);
      setNewBlog({ title: '', author: '', url: '' });
    }
    catch (exception) {
      console.log(exception);
    }
  };

  return (
    <form onSubmit={handleCreation}>
      <div>
        title <input
          type='text'
          value={newBlog.title}
          name='Title'
          onChange={({ target }) => setProperty('title', target.value)}
        />
      </div>
      <div>
        author <input
          type='text'
          value={newBlog.author}
          name='Author'
          onChange={({ target }) => setProperty('author', target.value)}
        />
      </div>
      <div>
        url <input
          type='text'
          value={newBlog.url}
          name='Url'
          onChange={({ target }) => setProperty('url', target.value)}
        />
      </div>
      <button type="submit">create</button>

    </form>
  );
};

export default NewBlog;