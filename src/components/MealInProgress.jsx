import React from 'react';
import PropTypes from 'prop-types';

function MealInProgress({
  meal,
  recipeIngredients,
  recipeMeasures,
  checkedIngredients,
  handleIngredientToggle }) {
  return (
    <section>
      <section className="img-title">
        <img
          className="recipe-img"
          src={ meal.strMealThumb }
          alt={ meal.strMealThumb }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title" className="recipe-title">
          {meal.strMeal}
        </h2>
      </section>
      <h3 data-testid="recipe-category" className="recipe-category">
        {meal.strCategory}
      </h3>
      <hr />
      <div>
        <h3>Ingredients</h3>
        {recipeIngredients.map((ing, index) => (
          <label
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            htmlFor="ingredient"
            className={ checkedIngredients.includes(ing) ? 'checked' : '' }
          >
            <input
              type="checkbox"
              value={ ing }
              id="check"
              checked={ checkedIngredients.includes(ing) }
              onChange={ (event) => handleIngredientToggle(event, ing) }
            />
            {`${recipeMeasures[index]} ${ing}`}
          </label>
        ))}
      </div>
      <span data-testid="instructions">{meal.strInstructions}</span>
    </section>
  );
}

MealInProgress.propTypes = {
  meal: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
  }).isRequired,
  recipeIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeMeasures: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleIngredientToggle: PropTypes.func.isRequired,
};

export default MealInProgress;
