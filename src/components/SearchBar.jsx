import React from 'react';

function SearchBar() {
  return (
    <form>
      <input data-testid="search-input" type="text" placeholder="Search Recipes" />
      <section>
        <div>
          <label>
            <input
              type="radio"
              name="ingredient"
              value="ingredient"
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>
          <label>
            <input
              type="radio"
              name="name"
              value="name"
              data-testid="name-search-radio"
            />
            Name
          </label>
          <label>
            <input
              type="radio"
              name="first letter"
              value="first letter"
              data-testid="first-letter-search-radio"
            />
            First letter
          </label>
        </div>
        <button type="button" data-testid="exec-search-btn">SEARCH</button>
      </section>
    </form>
  );
}

export default SearchBar;
