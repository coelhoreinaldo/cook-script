import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const RecipeContext = createContext();

const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function RecipeProvider({ children }) {
  const { fetchApi } = useFetch();
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);

  const fetchMeals = useCallback(async () => {
    const meals = await fetchApi(MEALS_URL);
    const drinks = await fetchApi(DRINKS_URL);
    setMealsData(meals);
    setDrinksData(drinks);
  }, [fetchApi]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const values = useMemo(() => ({
    mealsData, drinksData,
  }), [mealsData, drinksData]);

  return (
    <RecipeContext.Provider value={ values }>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;

RecipeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
