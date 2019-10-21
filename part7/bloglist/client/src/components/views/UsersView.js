import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UsersView = (props) => {

  const userTable = () => (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {props.users
          .map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>)}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Users</h2>
      {props.users && userTable()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const connectedUserView = connect(mapStateToProps)(UsersView);
export default connectedUserView;