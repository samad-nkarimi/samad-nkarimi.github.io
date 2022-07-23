const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <ol>
      <li>
        {props.parts[0]} {props.exercises[0]}
      </li>
      <li>
        {props.parts[1]} {props.exercises[1]}
      </li>
      <li>
        {props.parts[2]} {props.exercises[2]}
      </li>
    </ol>
  );
};

const Footer = (props) => {
  return (
    <p>
      {props.text} {props.exercises}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[part1, part2, part3]}
        exercises={[exercises1, exercises2, exercises3]}
      />
      <Footer
        text="Number of exercises"
        exercises={exercises1 + exercises2 + exercises3}
      />
    </div>
  );
};

export default App;
