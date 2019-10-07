const initialState = 'notifications';

export const setNotification = (message) => {
  console.log(message);
  return {
    type: 'SET_NOTIFICATION',
    notification: message
  };
};

export const removeNotification = () => {
  return { type: 'REMOVE_NOTIFICATION' };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'REMOVE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export default reducer;