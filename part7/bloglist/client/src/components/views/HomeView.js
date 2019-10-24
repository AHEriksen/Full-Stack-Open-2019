import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Togglable from '../Togglable';
import NewBlog from '../NewBlog';
import Blog from '../Blog';
import { List, ListItem, ListItemText } from '@material-ui/core';

// eslint-disable-next-line react/display-name
const HomeView = React.forwardRef((props, ref) => {

  const blogList = () => {
    const sortedBlogs = [...props.blogs]
      .sort((blog1, blog2) => blog2.likes - blog1.likes);
    return (
      <List >
        {sortedBlogs
          .map(blog =>
            <ListItem button key={blog.id}>
              <ListItemText primary={<Link key={blog.id} to={`/blogs/${blog.id}`}><Blog blog={blog} /></Link>} />
            </ListItem>
          )}
      </List>
    );
  };

  return (
    <div>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={ref}>
        <NewBlog handleCreation={props.handleCreation}/>
      </Togglable>
      {blogList()}
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  };
};

const connectedHomeView = connect(mapStateToProps, null, null, { forwardRef: true })(HomeView);
export default connectedHomeView;