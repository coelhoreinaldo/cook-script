import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';
import { RecipeContext } from '../context/RecipeProvider';
import RecipeCard from '../components/RecipeCard';
import './RecipeDetails.css';
// import shareIcon from '../images/shareIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const MAX_RECIPES_QUANTITY = 6;

function RecipeDetails() {
  const {
    currentRecipe, setCurrentRecipe, isFetching, errorMessage, fetchApi,
    setRecipeIngredients, recipeIngredients, setRecipeMeasures, recipeMeasures,
  } = useContext(RecipeDetailsContext);

  const { mealsData, drinksData, getData, getCategories } = useContext(RecipeContext);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  const { location: { pathname } } = useHistory();
  const history = useHistory();

  const getLocalStorageDoneRecipes = (currRecipe) => {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const hasInLocalStorage = doneRecipes.some((e) => e.id === currRecipe[0].idMeal);
      setIsDone(hasInLocalStorage);
    }
  };

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
    getLocalStorageDoneRecipes(recipeDetails);
    getLocalStorageInProgressRecipes(recipeDetails);
    if (response.meals) {
      const embed = recipeDetails[0].strYoutube.replace('watch?v=', 'embed/');
      recipeDetails[0].strYoutube = embed;
    }
    setCurrentRecipe(recipeDetails);
    const recipeEntries = Object.entries(recipeDetails[0]);
    const ingredients = recipeEntries
      .filter(([key, value]) => key.includes('strIngredient') && value)
      .map((item) => item[1]);

    const measures = recipeEntries
      .filter(([key, value]) => key.includes('strMeasure') && value)
      .map((item) => item[1]);

    setRecipeIngredients(ingredients);
    setRecipeMeasures(measures);
  }, [
    fetchApi, getLocalStorageInProgressRecipes, pathname,
    setCurrentRecipe, setRecipeIngredients, setRecipeMeasures,
  ]);

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

  useEffect(() => {
    getRecipeDetails();
    getData();
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return <p>Loading</p>;
  }

  if (errorMessage) {
    return <p>{ errorMessage }</p>;
  }

  return (
    <div className="recipe-details">
      { pathname.includes('meals')
        ? (
          <section>
            { currentRecipe.map((e) => (
              <section key={ e.idMeal }>
                <img
                  src={ e.strMealThumb }
                  alt={ e.strMeal }
                  data-testid="recipe-photo"
                  width={ 260 }
                />
                <h2 data-testid="recipe-title">{ e.strMeal }</h2>
                <h3 data-testid="recipe-category">{ e.strCategory }</h3>
                <ul>
                  { recipeIngredients.map((ing, i) => (
                    <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                      { ing }
                    </li>)) }
                  { recipeMeasures.map((ing, i) => (
                    <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                      { ing }
                    </li>)) }
                </ul>
                <p data-testid="instructions">{ e.strInstructions }</p>
                <iframe
                  title="Recipe"
                  width="260"
                  data-testid="video"
                  allowFullScreen
                  src={ e.strYoutube }
                />
              </section>
            )) }
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
              <section key={ e.idDrink }>
                <img
                  src={ e.strDrinkThumb }
                  alt={ e.strDrink }
                  data-testid="recipe-photo"
                  width={ 260 }
                />
                <h2 data-testid="recipe-title">{ e.strDrink }</h2>
                <h3 data-testid="recipe-category">
                  { e.strCategory }
                  { ' ' }
                  { e.strAlcoholic }
                </h3>
                <ul>
                  { recipeIngredients.map((ing, i) => (
                    <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                      { ing }
                    </li>)) }
                  { recipeMeasures.map((ing, i) => (
                    <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                      { ing }
                    </li>)) }
                </ul>
                <p data-testid="instructions">{ e.strInstructions }</p>
              </section>
            )) }
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
      { !isDone
        && (
          <button
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={ () => handleStartClick() }
          >
            Start Recipe
          </button>) }
      {isInProgress && <button data-testid="start-recipe-btn">Continue Recipe</button>}
      <button data-testid="share-btn" onClick={ handleShareClick }>
        <img src={ shareIcon } alt="share icon" />

      </button>
      {showLinkCopied && <small>Link copied!</small>}
      <button data-testid="favorite-btn">Favorite</button>
    </div>
  );
}

export default RecipeDetails;
