import React from 'react';
import Country from './country';

const Countries = ({results, showCountry, toggleCountry}) => {
  return results.map((country) => {
    const text = showCountry.get(country.name) ? 'hide' : 'show';
    return (
      <div key={country.name}>{country.name}
        <button onClick={() => toggleCountry(country.name)}>{text}</button>
        { showCountry.get(country.name) &&
          <Country country={country} />
        } 
      </div>
    );
    })
};

export default Countries;