import './index.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';
import { useField } from './hooks';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import Notification from './components/Notification';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { setUser, resetUser } from './reducers/userReducer';
import { addVote, createBlog, removeBlog } from './reducers/blogReducer';
import HomeView from './components/HomeView';
import UserView from './components/UserView';
import UsersView from './components/UsersView';

const App = (props) => {
  const [username] = useField('text');
  const [password] = useField('text');
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

  const { initializeUsers } = props;
  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

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
      console.log(user);
    }
    catch (exception) {
      console.log(exception);
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

  const handleCreation = async (blog) => {
    blogFormRef.current.toggleVisibility();
    try {
      await props.createBlog(blog);
      const msg = { text: `a new blog ${blog.title} by ${blog.author} added`, success: true };
      props.setNotification(msg, 5);
    }
    catch (exception) {
      console.log(exception);
    }
  };

  const incrementLikes = async (blog) => {
    try {
      await props.addVote(blog);
      const msg = {
        text: `You voted for ${blog.title}`,
        success: true
      };
      props.setNotification(msg, 5);
    }
    catch (exception) {
      const msg = {
        text: 'Could not increment likes',
        success: false
      };
      props.setNotification(msg, 5);
    }
  };

  const handleRemoval = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await props.removeBlog(blog);
        const msg = {
          text: `the blog ${blog.title} by ${blog.author} was deleted`, success: true
        };
        props.setNotification(msg, 5);
      }
      catch (exception) {
        const msg = {
          text: 'deletion failed, unauthorized',
          success: false
        };
        props.setNotification(msg, 5);
      }
    }
  };

  const blogList = () => {
    const sortedBlogs = [...props.blogs]
      .sort((blog1, blog2) => blog2.likes - blog1.likes);
    return (<>
      {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} remove={handleRemoval} increment={incrementLikes} username={props.user.username}/>)}
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

  const padding = {
    padding: 5
  };

  const findUserById = (id) => props.users.find(user => user.id === id);

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
        <div>
          <h2>blogs</h2>
          <Notification/>
          {`${props.user.name} logged in`}
          <button onClick={handleLogout}>logout</button>
        </div>
        <Router>
          <div>
            <Link style={padding} to='/'>home</Link>
            <Link style={padding} to='/users'>users</Link>
          </div>
          <Route exact path='/' render={() => <HomeView ref={blogFormRef} handleCreation={handleCreation} blogList={blogList}/>}></Route>
          <Route exact path='/users' render={() => <UsersView/>}></Route>
          <Route exact path='/users/:id' render={({ match }) => <UserView user={findUserById(match.params.id)}/>}></Route>
        </Router>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  };
};

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  initializeUsers,
  setUser,
  resetUser,
  addVote,
  createBlog,
  removeBlog
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
