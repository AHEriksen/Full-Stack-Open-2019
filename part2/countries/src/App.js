import React, { useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [newSearch, setNewSearch] = useState('');
  const [countryData, setCountryData] = useState([]);

  useEffect( () => {
    axios
         .get('https://restcountries.eu/rest/v2/all')
         .then(response => setCountryData(response.data))
  }, []);

  const searchHandler = (event) => setNewSearch(event.target.value);

  const displayResults = () => {
    const results = countryData.filter((country) =>
      country.name.toLowerCase().includes(newSearch.toLowerCase()));

    if (results.length > 10)
      return <p>Too many matches, specify another filter</p>;
    else if (results.length > 1)
      return results.map((country) => <p key={country.name}>{country.name}</p>);
    else if (results.length === 1)
      return (
        <div>
          <h1>
            {results[0].name}
          </h1>
          <p>
            capital {results[0].capital}
          </p>
          <p>
            population {results[0].population}
          </p>
          <h2>
            languages
          </h2>
          <ul>
            {results[0].languages.map((language) => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={results[0].flag} alt={`Flag of ${results[0].name}`}
               height="100"/>
        </div>
      )
  }

  return (
    <div>
      find countries <input value={newSearch} onChange={searchHandler}/>
      {displayResults()}
    </div>
  );
};

export default App;
