const initialState = null;

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: message
    });
    setTimeout(() => dispatch(removeNotification()), 1000 * seconds);
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