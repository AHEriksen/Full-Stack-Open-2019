import React, { useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [newSearch, setNewSearch] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [showCountry, setShowCountry] = useState(new Map());
  const [weather, setWeather] = useState(new Map());

  // typing out the country name sometimes fired multiple api calls
  const [apiCallPending, setApiCallPending] = useState(false);

  console.log("render");

  useEffect( () => {
    axios
         .get('https://restcountries.eu/rest/v2/all')
         .then(response => {
           setCountryData(response.data);
           setShowCountry(new Map(response.data.map((country) => [country.name, false])));
          }
         )
  }, []);

  const searchHandler = (event) => {
    setNewSearch(event.target.value);
  }

  const displayMultiple = (results) => {
    return results.map((country) =>
        <div key={country.name}>{country.name}
          <button onClick={() => toggleCountry(country.name)}>show</button>
          { showCountry.get(country.name) &&
            <div>{displayCountry(country)}</div>
          } 
        </div>);
  }

  const toggleCountry = (name) => {
    const copy = new Map(showCountry);
    copy.set(name, !(copy.get(name)));
    setShowCountry(copy);
  }

  const displayCountry = (country) => {
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
    </>);
  }

  const getWeatherCapital = (capital) => {
     return axios
      .get(`https://api.apixu.com/v1/current.json?key=d8d86a1388c84ec685f195349191908&q=${capital}`)
      .then(response => {
        const copy = new Map(weather);
        copy.set(capital, response.data)
        setWeather(copy);
        setApiCallPending(false);
        console.log("weather API call"); 
        });
  }


  const displaySingleCountry = (country) => {
    const weatherInfo = () => {
      const capWeather = weather.get(country.capital);
      return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature: {capWeather.current.temp_c}</p>
        <img src={capWeather.current.condition.icon} alt={`Weather condition: ${capWeather.current.condition.text}`} />
        <p><b>Wind:</b>  {capWeather.current.wind_kph} direction {capWeather.current.wind_dir}</p>
      </div>
      )
    }
    
    return (
      <div>
        {displayCountry(country)}
        {weather.get(country.capital) ? weatherInfo() : <div></div>}
      </div>
    )
  } 

  const displayResults = () => {
    const results = countryData.filter((country) =>
      country.name.toLowerCase().includes(newSearch.toLowerCase()));
    if (results.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
    else if (results.length > 1) {
      return displayMultiple(results);
    }
    else if (results.length === 1) {
      if (!weather.has(results[0].capital) && !apiCallPending) {
        setApiCallPending(true);
        getWeatherCapital(results[0].capital);
      }
      return displaySingleCountry(results[0]);
    }
  }

  return (
    <div>
      find countries <input value={newSearch} onChange={searchHandler}/>
      {displayResults()}
    </div>
  );
};

export default App;
