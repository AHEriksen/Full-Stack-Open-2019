import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({country}) => {
  const [weather, setWeather] = useState('');

  useEffect( () => {
  axios
    .get(`https://api.apixu.com/v1/current.json?key=d8d86a1388c84ec685f195349191908&q=${country.capital}`)
    .then(response => {
      setWeather(response.data);
    });
  }, [country.capital]);

  if (!weather) {
    return <div>loading weather</div>
  }
  else {
   return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weather.current.temp_c}</p>
      <img src={weather.current.condition.icon} alt={`Weather condition: ${weather.current.condition.text}`} />
      <p><b>Wind:</b>  {weather.current.wind_kph} direction {weather.current.wind_dir}</p>
    </div>
    )
   }
};

export default Weather;