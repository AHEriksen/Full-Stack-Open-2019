import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton, Button } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';

const NavigationMenu = (props) => {

  return (
    <div>
      <Button component={Link} to={'/'}>blogs</Button>
      <Button component={Link} to={'/users'}>users</Button>
      {`${props.user.name} logged in `}
      <IconButton onClick={props.handleLogout}>
        <PowerSettingsNew>logout</PowerSettingsNew>
      </IconButton>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const connectedNavigationMenu = connect(mapStateToProps)(NavigationMenu);
export default connectedNavigationMenu;

