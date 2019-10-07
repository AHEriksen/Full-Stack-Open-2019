import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';


const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault();
    props.createAnecdote(event.target.anecdote.value);
    props.setNotification(`you created "${event.target.anecdote.value}"`);
    setTimeout(() => props.removeNotification(), 5000);
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
  removeNotification
};

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default connectedAnecdoteForm;