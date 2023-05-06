import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeProvider';

function Recipes() {
  const { location: { pathname } } = useHistory();
  const {
    filteredMeals, filteredDrinks, mealsCategories, drinksCategories,
    isFetching, errorMessage, handleMealsFilterByCategory,
  } = useContext(RecipeContext);

  if (isFetching) {
    return (
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (errorMessage) {
    return (<h3>{errorMessage}</h3>);
  }

  return (
    <>
      <nav>
        {pathname === '/meals'
          ? mealsCategories.map(({ strCategory }) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ strCategory }
              onClick={ () => handleMealsFilterByCategory(strCategory) }
            >
              {strCategory}
            </button>
          ))
          : drinksCategories.map(({ strCategory }) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ strCategory }
              onClick={ () => handleMealsFilterByCategory(strCategory) }
            >
              {strCategory}
            </button>
          ))}
        <button
          data-testid="All-category-filter"
          onClick={ () => handleMealsFilterByCategory('All') }
        >
          All

        </button>
      </nav>
      <ul>
        {pathname === '/meals'
          ? filteredMeals.map((e, index) => (
            <li
              data-testid={ `${index}-recipe-card` }
              key={ e.idMeal }

            >
              <h3 data-testid={ `${index}-card-name` }>{e.strMeal}</h3>
              <figure className="figure">

                <img
                  width={ 200 }
                  className="img-thumbnail figure-img img-fluid rounded"
                  src={ e.strMealThumb }
                  alt={ e.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </figure>
            </li>
          )) : filteredDrinks.map((e, index) => (
            <li
              data-testid={ `${index}-recipe-card` }
              key={ e.idDrink }
            >
              <h3 data-testid={ `${index}-card-name` }>{e.strDrink}</h3>
              <figure className="figure">

                <img
                  width={ 200 }
                  className="img-thumbnail figure-img img-fluid rounded"
                  src={ e.strDrinkThumb }
                  alt={ e.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </figure>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Recipes;
