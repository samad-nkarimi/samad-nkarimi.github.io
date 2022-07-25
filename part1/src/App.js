import { useState, useEffect } from "react";
import axios from "axios";

const Person = ({ person }) => {
  return (
    <li>
      {person.name}
      {person.number}
    </li>
  );
};

const Filter = ({ value, handler }) => {
  return (
    <div>
      search: <input value={value} onChange={handler} />
    </div>
  );
};

const Form = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  saveNewName,
}) => {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={saveNewName}>
          add
        </button>
      </div>
    </form>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const getData = () => {
    console.log("effect");
    axios.get("http://localhost:3002/persons").then((response) => {
      console.log("response");
      setPersons(response.data);
    });
  };
  useEffect(getData, []);
  console.log("render", persons.length, "persons");

  var personsToShow = persons.filter((p) =>
    p.name.toLowerCase().match(searchValue.toLowerCase())
  );

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const saveNewName = () => {
    if (persons.find((p) => p.name === newName)) {
      alert("name already exists");
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchValue} handler={handleSearchChange} />
      <h2>add a new</h2>
      <Form
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        saveNewName={saveNewName}
      />
      <h2>Persons</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
