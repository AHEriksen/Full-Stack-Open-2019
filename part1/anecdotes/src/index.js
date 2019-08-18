import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Header = ({text}) => <h1>{text}</h1>

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));
    const [maxVote, setMaxVote] = useState(0);

    const setRandomAnecdote = () => {
        const len = props.anecdotes.length;
        // adds a random number in the range [1, len - 1] to the index and wraps around
        const randomNum = (selected + Math.floor(Math.random() * (len - 1)) + 1) % len;
        return setSelected(randomNum);
    }

    const incrementVotes = () => {
        const copy = [...votes];
        copy[selected]++;
        if (copy[selected] > copy[maxVote]) setMaxVote(selected); 
        return setVotes(copy);
    }
    
    return (
        <div> 
            <Header text="Anecdote of the day"/>
            {props.anecdotes[selected]} <br/>has {votes[selected]} votes<br/>
            <Button onClick={incrementVotes} text="vote"/>
            <Button onClick={setRandomAnecdote} text="next anecdote"/>
            <Header text="Anecdote with the most votes"/>
            {props.anecdotes[maxVote]} <br/>has {votes[maxVote]} votes
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)