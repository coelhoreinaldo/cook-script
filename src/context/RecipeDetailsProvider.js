import { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export const RecipeDetailsContext = createContext();

function RecipeDetailsProvider({ children }) {
  const { fetchApi, isFetching, errorMessage } = useFetch();
  const { location: { pathname } } = useHistory();
  const [currentRecipe, setCurrentRecipe] = useState([]);

  const getRecipeDetails = useCallback(async () => {
    let API_URL;
    const PATHNAME_PAGE = pathname.split('/')[1];
    const PATHNAME_ID = pathname.split('/')[2];
    if (PATHNAME_PAGE === 'meals') {
      API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${PATHNAME_ID}`;
    } else {
      API_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${PATHNAME_ID}`;
    }
    const recipeDetails = await fetchApi(API_URL);
    console.log(recipeDetails);
    setCurrentRecipe(recipeDetails);
  }, [fetchApi, pathname]);

  const values = useMemo(() => ({
    isFetching,
    errorMessage,
    currentRecipe,
    getRecipeDetails,
  }), [isFetching, errorMessage, currentRecipe, getRecipeDetails]);

  return (
    <RecipeDetailsContext.Provider value={ values }>
      {children}
    </RecipeDetailsContext.Provider>
  );
}

RecipeDetailsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipeDetailsProvider;
