const initialState = 'initial message';

export const notificationChange = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: message
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

export default reducer;