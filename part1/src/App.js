import { useState, useEffect } from "react";
import personsService from "./services/persons";

const Person = ({ person, deleteHandler }) => {
  return (
    <li>
      {person.name}
      {person.number}
      <button onClick={deleteHandler}>delete</button>
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
    personsService.getAll().then((data) => {
      console.log("response");
      setPersons(data);
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
  const deleteHandler = (id) => {
    const isOk = window.confirm(`delete pesron with id ${id}?`);
    if (!isOk) return;
    personsService.deletePerson(id).then((data) => {
      console.log(data);
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  const saveNewName = () => {
    const newPerson = { name: newName, number: newNumber };
    if (persons.find((p) => p.name === newName)) {
      alert("name already exists");
    } else {
      personsService.create({ newPerson }).then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
      });
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
          <Person
            key={person.name}
            person={person}
            deleteHandler={() => deleteHandler(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
