import { useState } from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <ol>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </ol>
  );
};

const Part = (props) => {
  return (
    <li>
      {props.part.name} {props.part.exercises}
    </li>
  );
};

const Total = (props) => {
  const text = "Number of exercises";
  const exercises =
    props.parts[0].exercises +
    props.parts[1].exercises +
    props.parts[2].exercises;
  return (
    <p>
      {text} {exercises}
    </p>
  );
};

const App = () => {
  const [counter, setCounter] = useState(0);

  // setTimeout(() => setCounter(counter + 1), 1000);

  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  const parts = [part1, part2, part3];
  const course = {
    name: "Half Stack application development",
    parts: parts,
  };

  return (
    <div>
      <h2>{counter}</h2>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <button onClick={() => setCounter(counter + 1)}>plus</button>
      <button onClick={() => setCounter(0)}>zero</button>
    </div>
  );
};

export default App;
