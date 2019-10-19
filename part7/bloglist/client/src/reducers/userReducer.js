const initialState = null;

export const setUser = (user) => {
  return {
    type: 'LOG_IN',
    data: user
  };
};

export const resetUser = () => {
  return {
    type: 'LOG_OUT'
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};

export default reducer;