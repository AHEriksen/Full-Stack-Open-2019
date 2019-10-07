import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';


const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.create(content);
    props.createAnecdote(newAnecdote);
    props.setNotification(`you created "${newAnecdote.content}"`);
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