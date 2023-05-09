import React from 'react';
import PropTypes from 'prop-types';

function DrinkDetails({
  strDrinkThumb, strDrink, strCategory, strAlcoholic,
  recipeIngredients, recipeMeasures, strInstructions,
}) {
  return (
    <div>
      <section>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
          width={ 260 }
        />
        <h2 data-testid="recipe-title">{ strDrink }</h2>
        <h3 data-testid="recipe-category">
          { strCategory }
          { ' ' }
          { strAlcoholic }
        </h3>
        <ul>
          { recipeIngredients.map((ing, i) => (
            <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
              { ing }
            </li>)) }
          { recipeMeasures.map((ing, i) => (
            <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
              { ing }
            </li>)) }
        </ul>
        <p data-testid="instructions">{ strInstructions }</p>
      </section>
    </div>
  );
}

DrinkDetails.propTypes = {
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  strAlcoholic: PropTypes.string.isRequired,
  recipeIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeMeasures: PropTypes.arrayOf(PropTypes.string).isRequired,
  strInstructions: PropTypes.string.isRequired,
};

export default DrinkDetails;
