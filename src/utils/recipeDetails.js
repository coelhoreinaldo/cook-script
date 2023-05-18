export const getLocalStorageDoneRecipes = (currRecipe) => {
  if (localStorage.getItem('doneRecipes')) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const hasInLocalStorage = doneRecipes.some((e) => e.id === currRecipe[0].idMeal);
    return hasInLocalStorage;
  }
};

export const getRecipesAndIngredients = (recipeDetails) => {
  const recipeEntries = Object.entries(recipeDetails);
  const ingredients = recipeEntries
    .filter(([key, value]) => key.includes('strIngredient') && value && value !== ' '
    && value !== null)
    .map((item) => item[1]);

  const measures = recipeEntries
    .filter(([key, value]) => key.includes('strMeasure') && value !== ' '
    && value !== null)
    .map((item) => item[1]);

  return { ingredients, measures };
};

export const verifyFavoriteInStorage = (currRecipe) => {
  if (localStorage.getItem('favoriteRecipes')) {
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const check = favoriteRecipesStorage
      .some((e) => e.id === currRecipe.idDrink || currRecipe.idMeal);
    return check;
  }
};

export const monitorCheckedIngredients = (id, recipeType, checkedIngredients) => {
  let template;
  if (localStorage.getItem('inProgressRecipes')) {
    const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipeType === 'drinks') {
      template = {
        drinks: {
          ...data.drinks, [id]: checkedIngredients,
        },
        meals: {
          ...data.meals,
        },
      };
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(template),
      );
    } else {
      template = {
        drinks: {
          ...data.drinks,
        },
        meals: {
          ...data.meals, [id]: checkedIngredients,
        },
      };
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(template),
      );
    }
  } else {
    template = {
      [recipeType]: {
        [id]: checkedIngredients,
      },
    };
  }
  localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify(template),
  );
};
