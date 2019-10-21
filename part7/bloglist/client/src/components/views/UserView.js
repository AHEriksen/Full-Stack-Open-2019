import React from 'react';
import { connect } from 'react-redux';

const UserView = (props) => {

  const blogList = () => (
    <ul>
      {
        props.user.blogs
          .map(blog => <li key={blog.id}>{blog.title}</li>)
      }
    </ul>
  );

  if (props.user === undefined)
    return null;
  else {
    return (
      <div>
        <h1>{props.user.name}</h1>
        <h2>added blogs</h2>
        { props.user &&
            blogList()
        }
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.id);
  return {
    user: state.users.find(user => user.id === ownProps.id)
  };
};

const connectedUserView = connect(mapStateToProps)(UserView);
export default connectedUserView;