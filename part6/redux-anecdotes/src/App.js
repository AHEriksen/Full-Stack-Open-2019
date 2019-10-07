import React from 'react';
import { addVote, createAnecdote } from './reducers/anecdoteReducer';

const App = (props) => {
  const store = props.store;
  const anecdotes = store.getState();

  const vote = (id) => {
    store.dispatch(addVote(id));
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    store.dispatch(createAnecdote(event.target.anecdote.value));
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;