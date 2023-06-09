import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';
import { RecipeContext } from '../context/RecipeProvider';
import RecipeCard from '../components/RecipeCard';
import '../style/RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import DrinkDetails from '../components/DrinkDetails';
import MealDetails from '../components/MealDetails';
import { getLocalStorageDoneRecipes, getRecipesAndIngredients, verifyFavoriteInStorage,
} from '../utils/recipeDetails';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

const MAX_RECIPES_QUANTITY = 6;

function RecipeDetails() {
  const {
    currentRecipe, setCurrentRecipe, isFetching, fetchApi,
    setRecipeIngredients, recipeIngredients, setRecipeMeasures, recipeMeasures,
  } = useContext(RecipeDetailsContext);

  const { mealsData, drinksData, getData, getCategories } = useContext(RecipeContext);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { location: { pathname } } = useHistory();
  const history = useHistory();

  const getLocalStorageInProgressRecipes = useCallback(async (currRecipe) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const inProgressRecipes = Object.keys(inProgressLocal[pathname.split('/')[1]]);
      if (inProgressRecipes.includes(currRecipe[0].idDrink || currRecipe[0].idMeal)) {
        setIsInProgress(true);
      }
    }
  }, [pathname]);

  const getRecipeDetails = useCallback(async () => {
    let API_URL;
    const PATHNAME_PAGE = pathname.split('/')[1];
    const PATHNAME_ID = pathname.split('/')[2];
    if (PATHNAME_PAGE === 'meals') {
      API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${PATHNAME_ID}`;
    } else {
      API_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${PATHNAME_ID}`;
    }
    const response = await fetchApi(API_URL);
    const recipeDetails = response.meals || response.drinks;
    setIsDone(getLocalStorageDoneRecipes(recipeDetails));
    getLocalStorageInProgressRecipes(recipeDetails);
    setIsFavorite(verifyFavoriteInStorage(recipeDetails[0]));
    if (response.meals) {
      const embed = recipeDetails[0].strYoutube.replace('watch?v=', 'embed/');
      recipeDetails[0].strYoutube = embed;
    }
    setCurrentRecipe(recipeDetails);
    setRecipeIngredients(getRecipesAndIngredients(recipeDetails[0]).ingredients);
    setRecipeMeasures(getRecipesAndIngredients(recipeDetails[0]).measures);
  }, [fetchApi, getLocalStorageInProgressRecipes, pathname, setCurrentRecipe,
    setRecipeIngredients, setRecipeMeasures]);

  const handleStartClick = () => {
    const PATHNAME_PAGE = pathname.split('/')[1];
    let recipeId;
    if (PATHNAME_PAGE === 'meals') {
      recipeId = currentRecipe[0].idMeal;
    } else {
      recipeId = currentRecipe[0].idDrink;
    }
    history.push(`/${PATHNAME_PAGE}/${recipeId}/in-progress`);
  };

  const handleShareClick = () => {
    setShowLinkCopied(true);
    copy(window.location.href);
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

  useEffect(() => {
    getRecipeDetails();
    getData();
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return (
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      { pathname.includes('meals')
        ? (
          <section>
            { currentRecipe.map((e) => (
              <MealDetails
                imgClass="recipe-img-details"
                key={ e.idMeal }
                strMealThumb={ e.strMealThumb }
                strMeal={ e.strMeal }
                strCategory={ e.strCategory }
                strYoutube={ e.strYoutube }
                recipeIngredients={ recipeIngredients }
                recipeMeasures={ recipeMeasures }
                strInstructions={ e.strInstructions }
              />
            )) }
            <hr />
            <h5>Experimente também:</h5>
            <section className="recomendations">
              { drinksData
                .filter((e, i) => i < MAX_RECIPES_QUANTITY)
                .map((e, index) => (<RecipeCard
                  cardClass="recomendation-card"
                  dataTestId={ `${index}-recommendation-card` }
                  dataTestIdTitle={ `${index}-recommendation-title` }
                  key={ e.idDrink }
                  index={ index }
                  pathname="drinks"
                  idRecipe={ e.idDrink }
                  strRecipe={ e.strDrink }
                  strRecipeThumb={ e.strDrinkThumb }
                />)) }
            </section>
          </section>)

        : (
          <section>
            { currentRecipe.map((e) => (
              <DrinkDetails
                key={ e.idDrink }
                imgClass="recipe-img-details"
                strDrinkThumb={ e.strDrinkThumb }
                strDrink={ e.strDrink }
                strCategory={ e.strCategory }
                strAlcoholic={ e.strAlcoholic }
                recipeIngredients={ recipeIngredients }
                recipeMeasures={ recipeMeasures }
                strInstructions={ e.strInstructions }
              />
            )) }
            <hr />
            <h5>Experimente também:</h5>
            <section className="recomendations">
              { mealsData
                .filter((e, i) => i < MAX_RECIPES_QUANTITY)
                .map((e, index) => (<RecipeCard
                  cardClass="recomendation-card"
                  dataTestId={ `${index}-recommendation-card` }
                  dataTestIdTitle={ `${index}-recommendation-title` }
                  key={ e.idMeal }
                  index={ index }
                  pathname="meals"
                  idRecipe={ e.idMeal }
                  strRecipe={ e.strMeal }
                  strRecipeThumb={ e.strMealThumb }
                />)) }

            </section>
          </section>
        ) }
      <section className="like-favorite-btns">
        <button data-testid="share-btn" onClick={ handleShareClick }>
          {showLinkCopied ? <p>Link copied!</p> : (
            <img src={ shareIcon } alt="share icon" />
          )}
        </button>
        <button onClick={ () => handleFavoriteClick(currentRecipe[0]) }>
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            data-testid="favorite-btn"
            alt="favorite icon"
          />
        </button>
      </section>
      { !isDone
        && (
          <button
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={ () => handleStartClick() }
          >
            Start Recipe
          </button>) }
      {isInProgress
      && (
        <button data-testid="start-recipe-btn" className="start-recipe-btn">
          Continue Recipe
        </button>
      )}
    </div>
  );
}

export default RecipeDetails;
