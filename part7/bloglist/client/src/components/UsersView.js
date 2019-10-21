import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';

const UsersView = (props) => {

  const { initializeUsers } = props;
  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

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
              <td>{user.name}</td>
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

const mapDispatchToProps = {
  initializeUsers
};

const connectedUserView = connect(mapStateToProps, mapDispatchToProps)(UsersView);
export default connectedUserView;