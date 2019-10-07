import React from 'react';
import { addVote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

const App = (props) => {
  const store = props.store;
  const anecdotes = store.getState();

  const vote = (id) => {
    store.dispatch(addVote(id));
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
      <AnecdoteForm store={props.store}/>
    </div>
  );
};

export default App;