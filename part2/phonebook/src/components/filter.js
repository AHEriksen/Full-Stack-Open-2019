import React from 'react';

const Filter = ({newSearch, handleNewSearch}) => (
  <div>
    filter shown with <input value={newSearch} onChange={handleNewSearch}/>
  </div>
);

export default Filter;