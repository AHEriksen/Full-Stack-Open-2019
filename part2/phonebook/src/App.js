import React, { useState, useEffect } from 'react';
import personService from './services/persons';

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

const Persons = ({persons, newSearch, remove}) => (
  persons
    .filter((person) =>
      person.name.toLowerCase().includes(newSearch.toLowerCase()))
    .map((person) => 
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => remove(person)}>delete</button>
      </div>
      )
);

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumChange = (event) => setNewNum(event.target.value);
  const handleNewSearch = (event) => setNewSearch(event.target.value);

  const addPerson = event => {
    event.preventDefault();
    const personObj = { name: newName, number: newNum};

    if (persons.some(p => p.name === newName))
    {
      if (window.confirm(`${newName} is already added to phonebook, replace
              the old number with a new one?`)) {
                const oldPerson = persons.find(p => p.name === newName);
                const newPerson = { ...oldPerson, number: newNum};
                personService
                  .update(newPerson)
                  .then(returnedPerson =>
                    setPersons(persons.map(person => person.id !== oldPerson.id
                        ? person : returnedPerson)));
              }
    }
    else 
    {
      personService
        .add(personObj)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }
    setNewName('');
    setNewNum('');
  };

  const removePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService 
        .remove(person.id)
        .then(setPersons(persons.filter(p => person.id !== p.id)));
    }
  }

  return (
    <div> 
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch}/>

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName}
                  handleNameChange={handleNameChange} newNum={newNum}
                  handleNumChange={handleNumChange} />

      <h3>Numbers</h3>

      <Persons persons={persons} newSearch={newSearch} remove={removePerson}/>
    </div>
  );
};

export default App;
