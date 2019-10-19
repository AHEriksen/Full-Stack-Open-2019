import './index.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useField } from './hooks';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser, resetUser } from './reducers/userReducer';

const App = (props) => {
  const username = useField('text');
  const password = useField('text');
  const blogFormRef = React.createRef();

  const { setUser } = props;
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, [setUser]);

  const { initializeBlogs } = props;
  useEffect(() => {
    initializeBlogs();
  }, [initializeBlogs]);

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
      props.setUser(user);
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
    props.resetUser();
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  const blogList = () => {
    const sortedBlogs = [...props.blogs]
      .sort((blog1, blog2) => blog2.likes - blog1.likes);
    return (<>
      {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} username={props.user.username}/>)}
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

  console.log(props.user);
  if (props.user === null) {
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
          {`${props.user.name} logged in`}
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

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  };
};

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  setUser,
  resetUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
