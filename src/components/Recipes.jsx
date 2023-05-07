import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
      <section className="d-flex flex-wrap justify-content-around gap-1">
        {pathname === '/meals'
          ? filteredMeals.map((e, index) => (
            <Link
              data-testid={ `${index}-recipe-card` }
              key={ e.idMeal }
              to={ `/meals/${e.idMeal}` }
            >
              <h3 data-testid={ `${index}-card-name` }>{e.strMeal}</h3>
              <figure className="figure">

                <img
                  width={ 144 }
                  className="img-thumbnail figure-img img-fluid rounded"
                  src={ e.strMealThumb }
                  alt={ e.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </figure>
            </Link>
          )) : filteredDrinks.map((e, index) => (
            <Link
              data-testid={ `${index}-recipe-card` }
              key={ e.idDrink }
              to={ `/drinks/${e.idDrink}` }
            >
              <h3 data-testid={ `${index}-card-name` }>{e.strDrink}</h3>
              <figure className="figure">

                <img
                  width={ 144 }
                  className="img-thumbnail figure-img img-fluid rounded"
                  src={ e.strDrinkThumb }
                  alt={ e.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </figure>
            </Link>
          ))}
      </section>
    </>
  );
}

export default Recipes;
