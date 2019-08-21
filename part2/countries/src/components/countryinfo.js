import React from 'react';
import Country from './country';
import Weather from './weather';

const CountryInfo = ({country}) => {
  return (
    <>
      <Country country={country} />
      <Weather country={country} />
    </>);
};

export default CountryInfo;