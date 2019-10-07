import { addVote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';
import React from 'react';

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes;

  const vote = (id) => {
    store.dispatch(addVote(id));
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    store.dispatch(setNotification(`you voted "${anecdote.content}"`));
    setTimeout(() => store.dispatch(removeNotification()), 5000);
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