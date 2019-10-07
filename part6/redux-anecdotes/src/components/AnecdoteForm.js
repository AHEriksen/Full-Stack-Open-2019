import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.createAnecdote(content);
    props.setNotification(`you created "${content}"`);
    setTimeout(() => props.removeNotification(), 5000);
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