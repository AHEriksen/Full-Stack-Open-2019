import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';
import React from 'react';

const AnecdoteForm = ({ store }) => {
  const addAnecdote = (event) => {
    event.preventDefault();
    store.dispatch(createAnecdote(event.target.anecdote.value));
    store.dispatch(setNotification(`you created "${event.target.anecdote.value}"`));
    setTimeout(() => store.dispatch(removeNotification()), 5000);
    event.target.anecdote.value = '';
  };

  return (
    <>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;