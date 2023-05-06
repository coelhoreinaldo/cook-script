import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const RecipeContext = createContext();

const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MEALS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINKS_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const MAX_ITEMS_QUANTITY = 12;
const MAX_CATEGORIES_QUANTITY = 5;

function RecipeProvider({ children }) {
  const { fetchApi, isFetching, errorMessage } = useFetch();
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  const getData = useCallback(async () => {
    const meals = await fetchApi(MEALS_URL);
    const drinks = await fetchApi(DRINKS_URL);
    setMealsData(meals.meals.filter((_, index) => index < MAX_ITEMS_QUANTITY));
    setDrinksData(drinks.drinks.filter((_, index) => index < MAX_ITEMS_QUANTITY));
  }, [fetchApi]);

  const getCategories = useCallback(async () => {
    const mealsCategoriesData = await fetchApi(MEALS_CATEGORIES);
    const drinksCategoriesData = await fetchApi(DRINKS_CATEGORIES);
    setMealsCategories(mealsCategoriesData.meals
      .filter((_, index) => index < MAX_CATEGORIES_QUANTITY));
    setDrinksCategories(drinksCategoriesData.drinks
      .filter((_, index) => index < MAX_CATEGORIES_QUANTITY));
  }, [fetchApi]);

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  const values = useMemo(() => ({
    mealsData, drinksData, mealsCategories, drinksCategories, isFetching, errorMessage,
  }), [
    mealsData, drinksData, mealsCategories, drinksCategories, isFetching, errorMessage,
  ]);

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
