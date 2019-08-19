import React, { useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [newSearch, setNewSearch] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [showCountry, setShowCountry] = useState(new Map());

  useEffect( () => {
    axios
         .get('https://restcountries.eu/rest/v2/all')
         .then(response => {
           setCountryData(response.data);
           setShowCountry(new Map(response.data.map((country) => [country.name, false])));
          }
         )
  }, []);

  const searchHandler = (event) => setNewSearch(event.target.value);

  const displayMultiple = (results) => {
    return results.map((country) =>
        <div key={country.name}>{country.name}
          <button onClick={() => toggleCountry(country.name)}>show</button>
          { showCountry.get(country.name) &&
            <div>{displayCountryHandler(country)}</div>
          }
          
        </div>);
  }

  const toggleCountry = (name) => {
    const copy = new Map(showCountry);
    copy.set(name, !(copy.get(name)));
    setShowCountry(copy);
  }

  const displayCountryHandler = (country) => {
    return (<div>
      <h1>
        {country.name}
      </h1>
      <p>
        capital {country.capital}
      </p>
      <p>
        population {country.population}
      </p>
      <h2>
        languages
      </h2>
      <ul>
        {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} height="100" />
    </div>);
  }

  const displayResults = () => {
    const results = countryData.filter((country) =>
      country.name.toLowerCase().includes(newSearch.toLowerCase()));
    if (results.length > 10)
      return <p>Too many matches, specify another filter</p>;
    else if (results.length > 1)
      return displayMultiple(results);
    else if (results.length === 1)
      return displayCountryHandler(results[0]);
  }

  return (
    <div>
      find countries <input value={newSearch} onChange={searchHandler}/>
      {displayResults()}
    </div>
  );
};

export default App;
