import React from 'react';

const Country = ({country}) => {
  return (
    <>
      <h1>
        {country.name}
      </h1>
      <p>
        Capital: {country.capital}
      </p>
      <p>
        Population: {country.population}
      </p>
      <h2>
        Languages
      </h2>
      <ul>
        {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} height="100" />
    </>
    );
}

export default Country;