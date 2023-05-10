export const getLocalStorageDoneRecipes = (currRecipe) => {
  if (localStorage.getItem('doneRecipes')) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const hasInLocalStorage = doneRecipes.some((e) => e.id === currRecipe[0].idMeal);
    return hasInLocalStorage;
  }
};
