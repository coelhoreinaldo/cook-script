import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeProvider';
import RecipeCard from './RecipeCard';

function Recipes() {
  const { location: { pathname } } = useHistory();
  const {
    filteredMeals, filteredDrinks, mealsCategories, drinksCategories,
    isFetching, handleMealsFilterByCategory, getData, getCategories,
  } = useContext(RecipeContext);

  useEffect(() => {
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

  // if (errorMessage) {
  //   return (<h3>{errorMessage}</h3>);
  // }

  return (
    <>
      <nav>
        { pathname === '/meals'
          ? mealsCategories.map(({ strCategory }) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ strCategory }
              onClick={ () => handleMealsFilterByCategory(strCategory) }
            >
              { strCategory }
            </button>
          ))
          : drinksCategories.map(({ strCategory }) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ strCategory }
              onClick={ () => handleMealsFilterByCategory(strCategory) }
            >
              { strCategory }
            </button>
          )) }
        <button
          data-testid="All-category-filter"
          onClick={ () => handleMealsFilterByCategory('All') }
        >
          All

        </button>
      </nav>
      <section className="d-flex flex-wrap justify-content-around gap-1">
        { pathname === '/meals'
          ? filteredMeals.map((e, index) => (
            <RecipeCard
              cardClass="recipe-page-card"
              dataTestId={ `${index}-recipe-card` }
              dataTestIdTitle={ `${index}-card-name` }
              key={ e.idMeal }
              index={ index }
              pathname="meals"
              idRecipe={ e.idMeal }
              strRecipe={ e.strMeal }
              strRecipeThumb={ e.strMealThumb }
            />
          )) : filteredDrinks.map((e, index) => (
            <RecipeCard
              cardClass="recipe-page-card"
              dataTestId={ `${index}-recipe-card` }
              dataTestIdTitle={ `${index}-card-name` }
              key={ e.idDrink }
              index={ index }
              pathname="drinks"
              idRecipe={ e.idDrink }
              strRecipe={ e.strDrink }
              strRecipeThumb={ e.strDrinkThumb }
            />
          )) }
      </section>
    </>
  );
}

export default Recipes;
