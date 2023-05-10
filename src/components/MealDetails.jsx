import React from 'react';
import PropTypes from 'prop-types';

function MealDetails({
  strMealThumb, strMeal, strCategory,
  recipeIngredients, recipeMeasures, strInstructions, strYoutube,
}) {
  return (
    <div>
      <section>
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid="recipe-photo"
          width={ 260 }
        />
        <h2 data-testid="recipe-title">{ strMeal }</h2>
        <h3 data-testid="recipe-category">{ strCategory }</h3>
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
        <iframe
          title="Recipe"
          width="260"
          data-testid="video"
          allowFullScreen
          src={ strYoutube }
        />
      </section>
    </div>
  );
}

MealDetails.propTypes = {
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  strYoutube: PropTypes.string.isRequired,
  recipeIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeMeasures: PropTypes.arrayOf(PropTypes.string).isRequired,
  strInstructions: PropTypes.string.isRequired,
};

export default MealDetails;
