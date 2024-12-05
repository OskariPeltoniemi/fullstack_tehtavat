import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  } else {
    return (
        <table>
          <tbody>
            <tr>
              <td><StatisticLine text="Good" /></td>
              <td><StatisticLine value={props.good} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="Neutral" /></td>
              <td><StatisticLine value={props.neutral} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="Bad" /></td>
              <td><StatisticLine value={props.bad} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="All" /></td>
              <td><StatisticLine value={props.all} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="Average" /></td>
              <td><StatisticLine value={props.average} /></td>
            </tr>
            <tr>
              <td><StatisticLine text="Positive" /></td>
              <td><StatisticLine value={props.positive} /></td>
            </tr>
          </tbody>
          
        </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const setToGood = () => {
    const newTotal = total + 1
    setGood(good + 1)
    setTotal(newTotal)
    setAverage(average + 1)
    setPositive(((good + 1) / newTotal) * 100);
  }
  
  const setToNeutral = () => {
    const newTotal = total + 1
    setNeutral(neutral + 1)
    setTotal(newTotal)
    setPositive((good / newTotal) * 100);
  }
  
  const setToBad = () => {
    const newTotal = total + 1
    setBad(bad + 1)
    setTotal(newTotal)
    setAverage(average - 1)
    setPositive((good / newTotal) * 100);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      
      <Button handleClick={setToGood} text="Good" />
      <Button handleClick={setToNeutral} text="Neutral" />
      <Button handleClick={setToBad} text="Bad" />

      <h1>Statistics</h1>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={total}
        average={average}
        positive={positive.toFixed(1)}
      />
    </div>
  )
}

export default App