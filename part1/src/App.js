import { useState } from "react";

const App2 = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <Button
        text="select"
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      />
      <div>{anecdotes[selected]}</div>
    </div>
  );
};

const Header = ({ text }) => <h1>{text}</h1>;
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;
const Category = ({ text, count }) => (
  <tr>
    <td align="start">{text}</td>
    <td align="start">{count}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>no feedback yet</p>;
  }
  return (
    <div>
      <Header text="statistics" />
      <table>
        <tbody>
          <Category text="good" count={good} />
          <Category text="natural" count={neutral} />
          <Category text="bad" count={bad} />
          <Category text="all" count={good + neutral + bad} />
          <Category
            text="average"
            count={(good - bad) / (good + neutral + bad)}
          />
          <Category
            text="positive"
            count={good / (good + neutral + bad) + " %"}
          />
        </tbody>
      </table>
    </div>
  );
};

export default App2;
