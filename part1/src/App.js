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
  return (
    <p>
      {props.text} {props.exercises}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
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

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total
        text="Number of exercises"
        exercises={part1.exercises + part2.exercises + part3.exercises}
      />
    </div>
  );
};

export default App;
