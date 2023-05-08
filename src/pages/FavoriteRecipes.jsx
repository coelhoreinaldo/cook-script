import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { RecipeContext } from '../context/RecipeProvider';

function FavoriteRecipes() {
  const {
    filteredMeals,
    // filteredDrinks,
    // mealsCategories,
    // drinksCategories,
    // isFetching,
    // errorMessage,
    // handleMealsFilterByCategory,
  } = useContext(RecipeContext);
  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {filteredMeals.map((e, index) => (
        <div key={ e.idMeal }>
          <Link
            data-testid={ `${index}-recipe-card` }
            to={ `/meals/${e.idMeal}` }
          >
            <h3 data-testid={ `${index}-horizontal-name` }>{e.strMeal}</h3>
            <figure className="figure">
              <img
                width={ 144 }
                className="img-thumbnail figure-img img-fluid rounded"
                src={ e.strMealThumb }
                alt={ e.strMeal }
                data-testid={ `${index}-horizontal-image` }
              />
            </figure>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>teste</p>
          <button data-testid={ `${index}-horizontal-share-btn` }>Share</button>
          <button data-testid={ `${index}-horizontal-favorite-btn` }>Favorite</button>
        </div>
      ))}

    </div>
  );
}

export default FavoriteRecipes;
