import React from 'react';
import Togglable from './Togglable';
import NewBlog from './NewBlog';

const HomeView = (props) => (
  <div>
    <h2>create new</h2>
    <Togglable buttonLabel="new blog" ref={props.ref}>
      <NewBlog handleCreation={props.handleCreation}/>
    </Togglable>
    {props.blogList()}
  </div>
);

export default HomeView;