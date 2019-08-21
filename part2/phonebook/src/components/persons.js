import React from 'react';

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

export default Persons;