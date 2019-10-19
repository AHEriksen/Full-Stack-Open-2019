import './index.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useField } from './hooks';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { setNotification } from './reducers/notificationReducer';

const App = (props) => {
  const [blogs, setBlogs] = useState([]);
  //const [username, setUsername] = useState('');
  const username = useField('text');
  const password = useField('text');
  const [user, setUser] = useState(null);

  const blogFormRef = React.createRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchAndSetBlogs = async () => {
      try {
        const data = await blogService.getAll();
        setBlogs(data);
      }
      catch (exception) {
        console.log(exception);
      }
    };
    fetchAndSetBlogs();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login(
        {
          username: username.input.value, password: password.input.value,
        });


      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
    }
    catch (exception) {
      const msg = {
        text: 'wrong username or password',
        success: false,
      };
      props.setNotification(msg, 5);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  const blogList = () => {
    const sortedBlogs = [ ...blogs ];
    sortedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes);
    return (<>
      {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} username={user.username}/>)}
    </>);
  };

  const loginForm = () => (
    <form onSubmit={ handleLogin }>
      <div>
        username
        <input {...username.input}/>
      </div>
      <div>
        password
        <input {...password.input}/>
      </div>
      <button type="submit">login</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        {loginForm()}
      </div>
    );
  }
  else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification/>
        <div>
          {`${user.name} logged in`}
          <button onClick={handleLogout}>logout</button>
          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlog blogFormRef={blogFormRef}/>
          </Togglable>
        </div>
        {blogList()}
      </div>
    );
  }
};

export default connect(null, { setNotification } )(App);
