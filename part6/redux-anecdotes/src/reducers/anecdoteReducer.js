import anecdoteService from '../services/anecdotes';

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdoteService.update(updatedAnecdote);
    dispatch({
      type: 'ADD_VOTE',
      data: updatedAnecdote
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'ADD_VOTE': {
      const updatedAnecdote = action.data;
      return state.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote);
    }
    case 'NEW_ANECDOTE':
      return state.concat(action.data);
    default:
      return state;
  }
};

export default reducer;