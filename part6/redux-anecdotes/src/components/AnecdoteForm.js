import { createAnecdote } from '../reducers/anecdoteReducer';
import React from 'react';

const AnecdoteForm = ({ store }) => {
  const addAnecdote = (event) => {
    event.preventDefault();
    store.dispatch(createAnecdote(event.target.anecdote.value));
    event.target.anecdote.value = '';
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;