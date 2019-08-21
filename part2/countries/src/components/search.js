import React from 'react';

const Search = ({newSearch, searchHandler}) => (
    <div>
      find countries <input value={newSearch} onChange={searchHandler}/>
    </div>
)

export default Search;