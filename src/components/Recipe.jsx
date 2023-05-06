import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeProvider';

function Recipe() {
  const { location: { pathname } } = useHistory();
  const {
    mealsData, drinksData, mealsCategories, drinksCategories,
  } = useContext(RecipeContext);
  return (
    <>
      <nav>
        {pathname === '/meals'
          ? mealsCategories.map(({ strCategory }) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ strCategory }
            >
              {strCategory}
            </button>
          ))
          : drinksCategories.map(({ strCategory }) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ strCategory }
            >
              {strCategory}
            </button>
          ))}
      </nav>
      <ul>
        {pathname === '/meals'
          ? mealsData.map((e, index) => (
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
          )) : drinksData.map((e, index) => (
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

export default Recipe;
