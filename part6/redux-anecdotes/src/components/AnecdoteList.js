import React from 'react';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes;
  const filter = props.filter;

  const vote = (id) => {
    props.addVote(id);
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    props.setNotification(`you voted "${anecdote.content}"`);
    setTimeout(() => props.removeNotification(), 5000);
  };

  return (
    <>
      {anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  addVote,
  setNotification,
  removeNotification
};

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default connectedAnecdoteList;