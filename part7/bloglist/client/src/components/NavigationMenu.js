import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const NavigationMenu = (props) => {

  const padding = { padding: 5 };
  return (
    <div className='navMenu'>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {`${props.user.name} logged in `}
      <button onClick={props.handleLogout}>logout</button>
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

