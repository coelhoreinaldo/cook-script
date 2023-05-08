import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const RecipeDetailsContext = createContext();

function RecipeDetailsProvider({ children }) {
  const { isFetching, errorMessage, fetchApi } = useFetch();
  const [currentRecipe, setCurrentRecipe] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeMeasures, setRecipeMeasures] = useState([]);

  const values = useMemo(() => ({
    isFetching,
    errorMessage,
    currentRecipe,
    setCurrentRecipe,
    fetchApi,
    recipeIngredients,
    setRecipeIngredients,
    recipeMeasures,
    setRecipeMeasures,
  }), [
    isFetching, errorMessage, currentRecipe, fetchApi, recipeIngredients, recipeMeasures,
  ]);

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
