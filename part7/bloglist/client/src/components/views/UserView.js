import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { LibraryBooks } from '@material-ui/icons';

const UserView = (props) => {

  const blogList = () => (
    <List>
      {props.user.blogs
        .map(blog =>
          <ListItem key={blog.id}>
            <ListItemIcon>
              <LibraryBooks />
            </ListItemIcon>
            <ListItemText primary={blog.title} />
          </ListItem>
        )}
    </List>
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
  return {
    user: state.users.find(user => user.id === ownProps.id)
  };
};

const connectedUserView = connect(mapStateToProps)(UserView);
export default connectedUserView;