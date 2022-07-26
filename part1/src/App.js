import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [show, setShow] = useState(false);
  const showDetails = () => {
    setShow(!show);
  };
  if (show) {
    return (
      <div>
        <li>
          {country.name.official} <button onClick={showDetails}>hide</button>
        </li>
        <DetailCountry country={country} />
      </div>
    );
  } else {
    return (
      <div>
        <li>
          {country.name.official} <button onClick={showDetails}>show</button>
        </li>
      </div>
    );
  }
};
const DetailCountry = ({ country }) => {
  console.log(Object.values(country.languages));
  return (
    <div>
      <h2>{country.name.official}</h2>
      <ul>
        <li>capital: {country.capital}</li>
        <li>area: {country.area}</li>
      </ul>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </div>
  );
};

const Filter = ({ value, handler }) => {
  return (
    <div>
      search: <input value={value} onChange={handler} />
    </div>
  );
};

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return <DetailCountry country={countries[0]} />;
  }
  if (countries.length > 10) {
    return <p>to many to show</p>;
  } else {
    return (
      <ul>
        {countries.map((c) => (
          <Country key={c.name["official"]} country={c} />
        ))}
      </ul>
    );
  }
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
  const [countries, setCountries] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const getData = () => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("response");
      setCountries(response.data);
    });
  };
  useEffect(getData, []);
  console.log("render", countries.length, "countries");
  console.log(countries[1]);

  var countriesToShow = countries.filter((p) =>
    p.name["official"].toLowerCase().match(searchValue.toLowerCase())
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
    if (countries.find((p) => p.name === newName)) {
      alert("name already exists");
    } else {
      // setCountries(countries.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchValue} handler={handleSearchChange} />

      <h2>Countries</h2>
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;
