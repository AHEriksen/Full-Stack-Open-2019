import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
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
          username, password,
        });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)  
      );
      console.log(window.localStorage.getItem('loggedBlogappUser'));

      setUser(user);
      setUsername('');
      setPassword('');
    }
    catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser');
  };

  const blogList = () => (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  );

  const loginForm = () => (
    <form onSubmit={ handleLogin }>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='text'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    );
  }
  else {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {`${user.name} logged in`}
          <button onClick={handleLogout}>logout</button>
        </div>
        {blogList()}
      </div>
    );
  }
}

export default App;
