import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');

  const handleNameChange = (event) => setNewName(event.target.value);

  const addName = (event) => {
    event.preventDefault();
    const personObj = { name: newName };
    if (persons.some(p => p.name === newName))
      alert(`${newName} is already added to phonebook`);
    else 
      setPersons(persons.concat(personObj));
    setNewName('');
  };

  const display = () =>
    persons.map((persons) => <p key={persons.name}>{persons.name}</p>);

  return (
    <div> 
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <div>
            <button type="submit">add</button>
          </div>
        </div>
      </form>
      <h2>Numbers</h2>
      {display()}
    </div>
  );
};

export default App;
