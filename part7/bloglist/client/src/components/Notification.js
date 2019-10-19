import React from 'react';
import { connect } from 'react-redux';

const Notification = ( props ) => {
  if (props.notification === null)
    return null;
  else if (props.notification.success)
  {
    return (
      <div className="successNotification">
        {props.notification.text}
      </div>
    );
  }
  else
    return (
      <div className="failNotification">
        {props.notification.text}
      </div>
    );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

const connectedNotification = connect(mapStateToProps)(Notification);
export default connectedNotification;