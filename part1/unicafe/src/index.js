import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistic = ({text, value}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return <p>No feedback given</p>;
    }
    
    return (
    <table>
        <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={good + neutral + bad} />
            <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
            <Statistic text="positive" value={good / (good + neutral + bad) + " %"} />
        </tbody>
    </table>
    )
}

const App = () => {
  // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header text='give feedback'/>
            <Button onClick={() => setGood(good + 1)} text='good' />
            <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
            <Button onClick={() => setBad(bad + 1)} text='bad' />
            <Header text='statistics'/>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
  )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)
