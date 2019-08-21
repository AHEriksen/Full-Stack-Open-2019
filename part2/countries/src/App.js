import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Display from './components/display';
import Search from './components/search';

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

  const toggleCountry = (name) => {
    const copy = new Map(showCountry);
    copy.set(name, !(copy.get(name)));
    setShowCountry(copy);
  };
  
  return (
    <div>
      <Search newSearch={newSearch} searchHandler={searchHandler} />
      <Display countryData={countryData} newSearch={newSearch}
               showCountry={showCountry} toggleCountry={toggleCountry}/>
    </div>
  );
};

export default App;
