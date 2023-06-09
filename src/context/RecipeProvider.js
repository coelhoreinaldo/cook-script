import { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export const RecipeContext = createContext();

export const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const MEALS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const MAX_ITEMS_QUANT = 12;
const MAX_CATEGORIES_QUANTITY = 5;

function RecipeProvider({ children }) {
  const { fetchApi, isFetching, errorMessage } = useFetch();
  const history = useHistory();
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  const getData = useCallback(async () => {
    const meals = await fetchApi(MEALS_URL);
    setMealsData(meals.meals.filter((_, i) => i < MAX_ITEMS_QUANT));
    setFilteredMeals(meals.meals.filter((_, i) => i < MAX_ITEMS_QUANT));
    const drinks = await fetchApi(DRINKS_URL);
    setDrinksData(drinks.drinks.filter((_, i) => i < MAX_ITEMS_QUANT));
    setFilteredDrinks(drinks.drinks.filter((_, i) => i < MAX_ITEMS_QUANT));
  }, [fetchApi]);

  const handleMealsFilterByCategory = useCallback(async (tag) => {
    if (history.location.pathname === '/meals') {
      if (tag === 'All') {
        setFilteredMeals(mealsData);
        return;
      }
      const mealsFilter = await fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${tag}`);
      const filtered = mealsFilter.meals.filter((_, i) => i < MAX_ITEMS_QUANT);
      if (filteredMeals[0].idMeal === filtered[0].idMeal) {
        setFilteredMeals(mealsData);
        return;
      }
      setFilteredMeals(filtered);
    } else {
      if (tag === 'All') {
        setFilteredDrinks(drinksData);
        return;
      }
      const drinksFilter = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${tag}`);
      const filtered = drinksFilter.drinks.filter((_, i) => i < MAX_ITEMS_QUANT);
      if (filteredDrinks[0].idDrink === filtered[0].idDrink) {
        setFilteredDrinks(drinksData);
        return;
      }
      setFilteredDrinks(filtered);
    }
  }, [drinksData, fetchApi,
    history.location.pathname, mealsData, filteredDrinks, filteredMeals]);

  const getCategories = useCallback(async () => {
    const mealsCategoriesData = await fetchApi(MEALS_CATEGORIES_URL);
    const drinksCategoriesData = await fetchApi(DRINKS_CATEGORIES_URL);
    setMealsCategories(mealsCategoriesData.meals
      .filter((_, i) => i < MAX_CATEGORIES_QUANTITY));
    setDrinksCategories(drinksCategoriesData.drinks
      .filter((_, i) => i < MAX_CATEGORIES_QUANTITY));
  }, [fetchApi]);

  const values = useMemo(() => ({
    mealsData,
    drinksData,
    mealsCategories,
    drinksCategories,
    isFetching,
    errorMessage,
    handleMealsFilterByCategory,
    filteredMeals,
    filteredDrinks,
    setFilteredMeals,
    setFilteredDrinks,
    getData,
    getCategories,
  }), [
    mealsData, drinksData, mealsCategories, drinksCategories,
    isFetching, errorMessage, handleMealsFilterByCategory, filteredMeals,
    filteredDrinks, getCategories, getData, setFilteredMeals,
    setFilteredDrinks,
  ]);

  return (
    <RecipeContext.Provider value={ values }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipeProvider;
