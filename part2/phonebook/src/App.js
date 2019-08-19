import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({newSearch, handleNewSearch}) => (
  <div>
    filter shown with <input value={newSearch} onChange={handleNewSearch}/>
  </div>
);

const PersonForm = ({addPerson, newName, handleNameChange, 
                     newNum, handleNumChange}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNum} onChange={handleNumChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({display}) => display();

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');

  useEffect(() => {
    axios
         .get('http://localhost:3001/persons')
         .then(response => setPersons(response.data))
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumChange = (event) => setNewNum(event.target.value);
  const handleNewSearch = (event) => setNewSearch(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = { name: newName, number: newNum};
    if (persons.some(p => p.name === newName))
      alert(`${newName} is already added to phonebook`);
    else 
      setPersons(persons.concat(personObj));
    setNewName('');
    setNewNum('');
  };

  const display = () =>
    persons.filter((person) =>
              person.name.toLowerCase().includes(newSearch.toLowerCase()))
           .map((person) => 
      <p key={person.name}>{person.name} {person.number}</p>);

  return (
    <div> 
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch}/>

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName}
                  handleNameChange={handleNameChange} newNum={newNum}
                  handleNumChange={handleNumChange} />

      <h3>Numbers</h3>

      <Persons display={display}/>
    </div>
  );
};

export default App;
