import React from 'react';

function SearchBar() {
  return (
    <form>
      <input data-testid="search-input" type="text" placeholder="Search Recipes" />
    </form>
  );
}

export default SearchBar;
