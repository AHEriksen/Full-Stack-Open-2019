import './index.css';
import React, { useState, useEffect } from 'react';
import personService from './services/person';
import Notification from './components/notification';
import Filter from './components/filter';
import PersonForm from './components/personform';
import Persons from './components/persons';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');
  const [ message, setMessage] = useState(null);

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
                  .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== oldPerson.id
                        ? person : returnedPerson));
                    setMessage(
                      {
                      text: `Number belonging to ${newPerson.name} changed`,
                      success: true
                      }
                      );
                    setTimeout( () => {
                      setMessage(null)
                    }, 4000);
                  })
                  .catch(e => {
                    if (e.response.data.error.name === 'ValidationError')
                    {
                      setMessage(
                        {
                          text: e.response.data.error.message,
                          success: false
                        }
                      );
                    }
                    else {
                      setMessage(
                        {
                        text: `Information of ${newPerson.name} has already been removed from server`,
                        success: false
                        }
                      );
                      setPersons(persons.filter(person => person.id !== newPerson.id));
                    }
                    setTimeout( () => {
                      setMessage(null)
                    }, 4000);
                  });
              }
    }
    else 
    {
      personService
        .add(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setMessage(
            {
            text: `Added ${personObj.name}`,
            success: true
            }
          );
          setTimeout( () => {
            setMessage(null)
          }, 4000);
        }) 
        .catch(e => {
          setMessage(
            {
            text: e.response.data.error.message,
            success: false
            });
          setTimeout( () => {
            setMessage(null)
          }, 4000);
        })
    }

    setNewName('');
    setNewNum('');
  };

  const removePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService 
        .remove(person.id)
        .then(id => {
          setPersons(persons.filter(p => person.id !== p.id))
          setMessage({text: `Deleted ${person.name}`, success: true});
          setTimeout(() => {
            setMessage(null)
          }, 4000);
        });
    }
  }

  return (
    <div> 
      <h2>Phonebook</h2>

      <Notification message={message}/>

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
