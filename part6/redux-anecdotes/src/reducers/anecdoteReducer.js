
const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: asObject(anecdote)
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'ADD_VOTE': {
      const id = action.data.id;
      const anecdote = state.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote);
    }
    case 'NEW_ANECDOTE':
      return state.concat(action.data);
    default:
      return state;
  }
};

export default reducer;