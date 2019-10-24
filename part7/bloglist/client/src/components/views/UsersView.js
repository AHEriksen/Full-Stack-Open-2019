import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHead, TableCell, TableRow, Button } from '@material-ui/core';

const UsersView = (props) => {

  const userTable = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>blogs created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.users
          .map(user =>
            <TableRow key={user.id}>
              <TableCell><Button component={Link} to={`/users/${user.id}`}>{user.name}</Button></TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>)}
      </TableBody>
    </Table>
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