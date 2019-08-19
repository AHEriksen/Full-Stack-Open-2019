import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');

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
    persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    .map((person) => 
      <p key={person.name}>{person.name} {person.number}</p>);
      
  return (
    <div> 
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newSearch} onChange={handleNewSearch}/>
      </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      {display()}
    </div>
  );
};

export default App;
