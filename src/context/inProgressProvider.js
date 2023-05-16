import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { RecipeDetailsContext } from './RecipeDetailsProvider';

const copy = require('clipboard-copy');

export const InProgressContext = createContext();

function InProgressProvider({ children }) {
  const {
    setCurrentRecipe, fetchApi,
    setRecipeIngredients, setRecipeMeasures,
  } = useContext(RecipeDetailsContext);

  const { location: { pathname } } = useHistory();
  const history = useHistory();

  const id = pathname.split('/')[2];
  const recipeType = pathname.split('/')[1];

  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  const getRecipeDetails = useCallback(async () => {
    let API_URL;
    if (recipeType === 'meals') {
      API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      API_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const response = await fetchApi(API_URL);
    const recipeDetails = response.meals || response.drinks;
    setIsFavorite(verifyFavoriteInStorage(recipeDetails[0]));
    setCurrentRecipe(recipeDetails);

    setRecipeIngredients(getRecipesAndIngredients(recipeDetails[0]).ingredients);
    setRecipeMeasures(getRecipesAndIngredients(recipeDetails[0]).measures);
  }, [fetchApi, id, recipeType, setCurrentRecipe, setRecipeIngredients,
    setRecipeMeasures]);

  const getLocalStorageIngredients = () => {
    if (localStorage.getItem('inProgressRecipes')) {
      const storageArray = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setCheckedIngredients(storageArray[recipeType][id]);
    }
  };

  const handleFavoriteClick = (item) => {
    const recipeInfo = {
      id: item.idMeal || item.idDrink,
      type: item.idMeal ? 'meal' : 'drink',
      nationality: item.strArea || '',
      category: item.strCategory,
      alcoholicOrNot: item.strAlcoholic || '',
      name: item.strMeal || item.strDrink,
      image: item.strMealThumb || item.strDrinkThumb,
    };
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipesStorage.some((e) => e.id === recipeInfo.id)) {
        const filtered = favoriteRecipesStorage.filter((e) => e.id !== recipeInfo.id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
        setIsFavorite(verifyFavoriteInStorage(item));
        return;
      }
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favoriteRecipesStorage, recipeInfo]),
      );
      setIsFavorite(verifyFavoriteInStorage(item));

      return;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipeInfo]));
    setIsFavorite(verifyFavoriteInStorage(item));
  };

  const handleShareClick = () => {
    setShowLinkCopied(true);
    const path = window.location.href;
    const link = path.split('/').filter((e, i, arr) => i !== arr.length - 1);
    copy(link.join('/'));
  };

  const handleFinishRecipe = (item) => {
    const date = new Date();
    const recipeInfo = {
      id: item.idMeal || item.idDrink,
      type: item.idMeal ? 'meal' : 'drink',
      nationality: item.strArea || '',
      category: item.strCategory,
      alcoholicOrNot: item.strAlcoholic || '',
      name: item.strMeal || item.strDrink,
      image: item.strMealThumb || item.strDrinkThumb,
      doneDate: date.toISOString(),
      tags: item.strTags ? item.strTags.split(',') : [],
    };

    if (localStorage.getItem('doneRecipes')) {
      const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipesStorage.some((e) => e.id === recipeInfo.id)) {
        const filtered = doneRecipesStorage.filter((e) => e.id !== recipeInfo.id);
        localStorage.setItem('doneRecipes', JSON.stringify(filtered));
        return;
      }
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...doneRecipesStorage, recipeInfo]),
      );
      return;
    }
    localStorage.setItem('doneRecipes', JSON.stringify([recipeInfo]));
    history.push('/done-recipes');
  };

  const handleIngredientToggle = (event, ingred) => {
    if (event.target.checked) {
      setCheckedIngredients([...checkedIngredients, ingred]);
      return;
    }
    setCheckedIngredients(checkedIngredients.filter((e) => e !== ingred));
  };

  const values = useMemo(() => ({
    getRecipeDetails,
    getLocalStorageIngredients,
    handleFavoriteClick,
    handleShareClick,
    handleFinishRecipe,
    handleIngredientToggle,
    checkedIngredients,
    isFavorite,
    showLinkCopied,
  }), [checkedIngredients, isFavorite, showLinkCopied]);

  return (
    <InProgressProvider.Provider value={ values }>
      {children}
    </InProgressProvider.Provider>
  );
}

InProgressProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default InProgressProvider;
