import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';

function RecipeDetails() {
  const {
    currentRecipe, setCurrentRecipe, isFetching, errorMessage, fetchApi,
    setRecipeIngredients, recipeIngredients,
  } = useContext(RecipeDetailsContext);

  const { location: { pathname } } = useHistory();

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
    setCurrentRecipe(recipeDetails);
    const recipeEntries = Object.entries(recipeDetails[0]);
    const ingredients = recipeEntries
      .filter(([key, value]) => key.includes('strIngredient') && value)
      .map((item) => item[1]);
    setRecipeIngredients(ingredients);
  }, [fetchApi, pathname, setCurrentRecipe, setRecipeIngredients]);

  useEffect(() => {
    getRecipeDetails();
  }, []);

  if (isFetching) {
    return <p>Loading</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  // console.log(currentRecipe);

  // if (currentRecipe.length > 0) {
  //   const ingredients = Object.entries(currentRecipe[0]);
  //   const filtered = ingredients
  //     .filter(([key, value]) => key.includes('strIngredient') && value)
  //     .map((item) => item[1]);
  //   console.log(filtered);
  // }

  return (
    <div>
      {pathname.includes('meals')
        ? currentRecipe.map((e) => (
          <section key={ e.idMeal }>
            <img src={ e.strMealThumb } alt={ e.strMeal } data-testid="recipe-photo" />
            <h2 data-testid="recipe-title">{e.strMeal}</h2>
            <h3 data-testid="recipe-category">{e.strCategory}</h3>
            <ul>
              {recipeIngredients.map((ing, i) => (
                <li
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ i }
                >
                  {ing}
                </li>))}
            </ul>
            <p data-testid="instructions">{e.strInstructions}</p>
            <iframe
              title="Recipe"
              width="420"
              height="315"
              data-testid="video"
              src={ e.strYoutube }
            />
          </section>
        ))
        : currentRecipe.map((e) => (
          <section key={ e.idDrink }>
            <img src={ e.strDrinkThumb } alt={ e.strDrink } data-testid="recipe-photo" />
            <h2 data-testid="recipe-title">{e.strDrink}</h2>
            <h3 data-testid="recipe-category">{e.strCategory}</h3>
            <ul>
              {recipeIngredients.map((ing, i) => (
                <li
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ i }
                >
                  {ing}
                </li>))}
            </ul>
            <p data-testid="instructions">{e.strInstructions}</p>
          </section>
        ))}

    </div>
  );
}

export default RecipeDetails;
