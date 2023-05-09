import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { RecipeContext } from './RecipeProvider';
import useFetch from '../hooks/useFetch';

export const SearchBarContext = createContext();

function SearchBarProvider({ children }) {
  const MAX_ITEMS_QUANT = 12;

  const { setFilteredMeals, setFilteredDrinks } = useContext(RecipeContext);

  const { fetchApi } = useFetch();

  const [searchBarVisible, setsearchBarVisible] = useState(false);

  const [searchFilter, setSearchFilter] = useState(
    { inputSearch: '', type: '' },
  );

  const changeVisibility = () => {
    setsearchBarVisible((prevState) => !prevState);
  };

  const handleFilter = ({ target }) => {
    const { name, value } = target;
    setSearchFilter((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFilteredRecipes = useCallback(async (param) => {
    const URLByLocation = param.includes('meals') ? 'themealdb' : 'thecocktaildb';
    let searchData;
    const { inputSearch, type } = searchFilter;
    if (type === 'first letter' && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    switch (type) {
    case 'ingredient': {
      searchData = await fetchApi(
        `https://www.${URLByLocation}.com/api/json/v1/1/filter.php?i=${inputSearch}`,
      );
      break;
    }
    case 'name': {
      searchData = await fetchApi(
        `https://www.${URLByLocation}.com/api/json/v1/1/search.php?s=${inputSearch}`,
      );
      break;
    }
    default:
      searchData = await fetchApi(
        `https://www.${URLByLocation}.com/api/json/v1/1/search.php?f=${inputSearch}`,
      );
    }

    if (param.includes('meals')) {
      const filteredMeals = searchData.meals.filter((_, i) => i < MAX_ITEMS_QUANT);
      setFilteredMeals(filteredMeals);
    } else {
      const filteredDrinks = searchData.drinks.filter((_, i) => i < MAX_ITEMS_QUANT);
      setFilteredDrinks(filteredDrinks);
    }
  }, [fetchApi, searchFilter, setFilteredDrinks, setFilteredMeals]);

  const values = useMemo(() => ({
    searchBarVisible,
    changeVisibility,
    handleFilter,
    searchFilter,
    handleFilteredRecipes,
  }), [searchBarVisible, searchFilter, handleFilteredRecipes]);

  return (
    <SearchBarContext.Provider value={ values }>
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchBarProvider;
