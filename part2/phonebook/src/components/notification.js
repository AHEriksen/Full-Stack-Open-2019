import React from 'react';

const Notification = ({message}) => {
  if (message === null)
    return null;
  else if (message.success)
  {
    return (
      <div className="successNotification">
        {message.text}
      </div>
    )
  }
  else
    return (
      <div className="failNotification">
        {message.text}
      </div>
    )
}

export default Notification;