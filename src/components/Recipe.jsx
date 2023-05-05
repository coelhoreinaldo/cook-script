import React from 'react';
import PropTypes from 'prop-types';

function Recipe({ mealsData, drinksData }) {
  console.log(mealsData);
  return (
    <ul>
      {mealsData && mealsData.map((e, index) => (
        <li
          data-testid={ `${index}-recipe-card` }
          key={ e.idMeal }
        >
          <h3
            data-testid={ `${index}-card-name` }
          >
            {e.strMeal}

          </h3>
          <img
            src={ e.strMealThumb }
            alt={ e.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </li>
      ))}
      {drinksData && drinksData.map((e, index) => (
        <li
          data-testid={ `${index}-recipe-card` }
          key={ e.idDrink }
        >
          <h3
            data-testid={ `${index}-card-name` }
          >
            {e.strDrink}

          </h3>
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

Recipe.propTypes = {
  mealsData: PropTypes.arrayOf(
    PropTypes.shape({
      idMeal: PropTypes.string.isRequired,
      strMeal: PropTypes.string.isRequired,
      strMealThumb: PropTypes.string.isRequired,
    }),
  ).isRequired,
  drinksData: PropTypes.arrayOf(
    PropTypes.shape({
      idDrink: PropTypes.string.isRequired,
      strDrink: PropTypes.string.isRequired,
      strDrinkThumb: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Recipe;
