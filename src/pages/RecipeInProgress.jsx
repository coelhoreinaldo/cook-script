import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { getRecipesAndIngredients,
  monitorCheckedIngredients,
  verifyFavoriteInStorage } from '../utils/recipeDetails';
import DrinkInProgress from '../components/DrinkInProgress';
import MealInProgress from '../components/MealInProgress';
import '../style/RecipeInProgress.css';

const copy = require('clipboard-copy');

function RecipesInProgress() {
  const {
    currentRecipe, setCurrentRecipe, fetchApi, isFetching,
    setRecipeIngredients, recipeIngredients, setRecipeMeasures, recipeMeasures,
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
    if (localStorage.getItem('inProgressRecipes')
    && JSON.parse(localStorage.getItem('inProgressRecipes'))[recipeType][id]) {
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
      history.push('/done-recipes');
      return;
    }
    localStorage.setItem('doneRecipes', JSON.stringify([recipeInfo]));
    history.push('/done-recipes');
  };

  useEffect(() => {
    getRecipeDetails();
    getLocalStorageIngredients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIngredientToggle = (event, ingred) => {
    if (event.target.checked) {
      setCheckedIngredients([...checkedIngredients, ingred]);
      return;
    }
    setCheckedIngredients(checkedIngredients.filter((e) => e !== ingred));
  };

  useEffect(() => {
    monitorCheckedIngredients(id, recipeType, checkedIngredients);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedIngredients]);

  if (isFetching) {
    return (
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="recipe-container">
      {pathname.includes('meals')
        ? (
          <>
            {currentRecipe.map((meal) => (
              <MealInProgress
                key={ meal.idMeal }
                meal={ meal }
                recipeIngredients={ recipeIngredients }
                recipeMeasures={ recipeMeasures }
                checkedIngredients={ checkedIngredients }
                handleIngredientToggle={ handleIngredientToggle }
              />
            ))}
          </>)
        : (
          <>
            {currentRecipe.map((drink) => (
              <DrinkInProgress
                key={ drink.idDrink }
                drink={ drink }
                recipeIngredients={ recipeIngredients }
                recipeMeasures={ recipeMeasures }
                checkedIngredients={ checkedIngredients }
                handleIngredientToggle={ handleIngredientToggle }
              />
            ))}
          </>)}
      <section className="like-favorite-btns">
        {showLinkCopied && <small>Link copied!</small>}
        <button data-testid="share-btn" onClick={ handleShareClick }>
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button
          onClick={ () => handleFavoriteClick(currentRecipe[0]) }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            data-testid="favorite-btn"
            alt="favorite icon"
          />
        </button>
      </section>
      <button
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn"
        disabled={ checkedIngredients.length !== recipeIngredients.length }
        onClick={ () => handleFinishRecipe(currentRecipe[0]) }
      >
        Finalizar
      </button>
    </div>
  );
}

export default RecipesInProgress;
