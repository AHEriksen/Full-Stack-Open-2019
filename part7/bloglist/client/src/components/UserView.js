import React from 'react';
import { connect } from 'react-redux';

const UserView = (props) => {

  const blogList = () => (
    <ul>
      {
        props.userInfo.blogs
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
        { props.userInfo &&
            blogList()
        }
      </div>
    );
  }

};

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: ownProps.user
  };
};

const connectedUserView = connect(mapStateToProps)(UserView);
export default connectedUserView;