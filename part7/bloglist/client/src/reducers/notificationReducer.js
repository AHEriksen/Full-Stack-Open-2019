const initialState = null;

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      text: message.text,
      success: message.success
    });
    setTimeout(() => dispatch(removeNotification()), 1000 * seconds);
  };
};

const removeNotification = () => {
  return { type: 'REMOVE_NOTIFICATION' };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { text: action.text, success: action.success };
    case 'REMOVE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export default reducer;