import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeProvider';

function Recipe() {
  const { location: { pathname } } = useHistory();
  const { mealsData, drinksData } = useContext(RecipeContext);
  return (
    <ul>
      {pathname === '/meals'
        ? mealsData.map((e, index) => (
          <li
            data-testid={ `${index}-recipe-card` }
            key={ e.idMeal }
          >
            <h3 data-testid={ `${index}-card-name` }>{e.strMeal}</h3>
            <img
              src={ e.strMealThumb }
              alt={ e.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </li>
        )) : drinksData.map((e, index) => (
          <li
            data-testid={ `${index}-recipe-card` }
            key={ e.idDrink }
          >
            <h3 data-testid={ `${index}-card-name` }>{e.strDrink}</h3>
            <img
              src={ e.strDrinkThumb }
              alt={ e.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </li>
        ))}
    </ul>
  );
}

export default Recipe;
