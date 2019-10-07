import { addVote } from '../reducers/anecdoteReducer';
import React from 'react';

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState();

  const vote = (id) => {
    store.dispatch(addVote(id));
  };

  return (
    <>
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
    </>
  );
};

export default AnecdoteList;