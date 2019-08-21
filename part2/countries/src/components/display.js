import React from 'react';
import CountryInfo from './countryinfo';
import Countries from './countries';

const Display = ({countryData, newSearch, showCountry, toggleCountry}) => {
  const results = countryData.filter((country) =>
    country.name.toLowerCase().includes(newSearch.toLowerCase()));
  if (results.length > 10 || results.length === 0) {
    return <p>Too many matches, specify another filter</p>;
  }
  else if (results.length > 1) {
    return <Countries results={results} showCountry={showCountry}
              toggleCountry={toggleCountry}/>;
  }
  else if (results.length === 1) {
    return <CountryInfo country={results[0]}/>;
  }
};

export default Display;