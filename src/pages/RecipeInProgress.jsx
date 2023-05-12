import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';
import './RecipeInProgress.css';
// import { InProgressContext } from '../context/inProgressContext';

function RecipesInProgress() {
  const {
    currentRecipe, setCurrentRecipe, fetchApi,
    setRecipeIngredients, recipeIngredients, setRecipeMeasures, recipeMeasures,
  } = useContext(RecipeDetailsContext);

  // const {
  //   checkedIngredients, handleIngredientToggle,
  // } = useContext(InProgressContext);

  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const handleIngredientToggle = (event, index) => {
    if (event.target.checked) {
      setCheckedIngredients([...checkedIngredients, index]);
    } else {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== index));
    }
  };

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
    // console.log(recipeDetails);
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
  }, [fetchApi, pathname, setCurrentRecipe, setRecipeIngredients, setRecipeMeasures]);

  useEffect(() => {
    getRecipeDetails();
  }, []);

  return (
    <div>
      <Header />
      {pathname.includes('meals')
        ? (
          <section>
            {currentRecipe.map((meal) => (
              <section key={ meal.idMeal }>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMealThumb }
                  data-testid="recipe-photo"
                  width={ 260 }
                />
                <h2 data-testid="recipe-title">{meal.strMeal}</h2>
                <button data-testid="share-btn">Compartilhar</button>
                <button data-testid="favorite-btn">Favoritar</button>
                <h3 data-testid="recipe-category">{meal.strCategory}</h3>
                <div>
                  {recipeIngredients.map((ing, index) => (

                    <label
                      key={ index }
                      data-testid={ `${index}-ingredient-step` }
                      htmlFor="ingredient"
                      className={ checkedIngredients.includes(index) ? 'checked' : '' }
                    >
                      {`${recipeMeasures[index]} ${ing}`}
                      <input
                        type="checkbox"
                        value={ ing }
                        id="check"
                        checked={ checkedIngredients.includes(index) }
                        onChange={ (event) => handleIngredientToggle(event, index) }
                      />
                    </label>
                  ))}
                </div>
                <span data-testid="instructions">{meal.strInstructions}</span>
                <button data-testid="finish-recipe-btn">Finalizar</button>
              </section>

            ))}
          </section>)
        : (
          <section>
            {currentRecipe.map((drink) => (
              <section key={ drink.idDrink }>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid="recipe-photo"
                  width={ 260 }
                />
                <h2 data-testid="recipe-title">{drink.strDrink}</h2>
                <button data-testid="share-btn">Compartilhar</button>
                <button data-testid="favorite-btn">Favoritar</button>
                <h3 data-testid="recipe-category">
                  {drink.strCategory}
                  <span data-testid="instructions">{drink.strInstructions}</span>
                  {' '}
                  {drink.strAlcoholic}
                </h3>
                <div>
                  {recipeIngredients.map((ing, index) => (
                    <label
                      key={ index }
                      data-testid={ `${index}-ingredient-step` }
                      htmlFor="ingredient"
                      className={ checkedIngredients.includes(index) ? 'checked' : '' }
                    >
                      {`${recipeMeasures[index]} ${ing}`}
                      <input
                        type="checkbox"
                        value={ ing }
                        id="check"
                        checked={ checkedIngredients.includes(index) }
                        onChange={ (event) => handleIngredientToggle(event, index) }
                      />
                    </label>

                  ))}

                </div>
                <span data-testid="instructions">{drink.strInstructions}</span>
                <button data-testid="finish-recipe-btn">Finalizar</button>
              </section>

            ))}
          </section>)}
    </div>
  );
}

export default RecipesInProgress;
