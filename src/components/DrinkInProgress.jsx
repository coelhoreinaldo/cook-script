import React from 'react';
import PropTypes from 'prop-types';

function DrinkInProgress({
  drink,
  recipeIngredients,
  recipeMeasures,
  checkedIngredients,
  handleIngredientToggle }) {
  return (
    <section>
      <section className="img-title">
        <img
          className="recipe-img"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title" className="recipe-title">
          {drink.strDrink}
        </h2>
      </section>
      <h3 data-testid="recipe-category" className="recipe-category">
        {drink.strCategory}
        {' - '}
        {drink.strAlcoholic}
      </h3>
      <hr />
      <div className="ingredients">
        <h3>Ingredients</h3>
        <section className="ingredients-list">
          {recipeIngredients.map((ing, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ ing }
              className={ checkedIngredients.includes(ing) ? 'checked' : '' }
            >
              <input
                type="checkbox"
                value={ ing }
                id={ ing }
                checked={ checkedIngredients.includes(ing) }
                onChange={ (event) => handleIngredientToggle(event, ing) }
              />
              {`${recipeMeasures[index]} ${ing}`}
            </label>
          ))}
        </section>
      </div>
      <section className="instructions">
        <h3>Instructions</h3>
        <span data-testid="instructions">{drink.strInstructions}</span>
      </section>
    </section>
  );
}

DrinkInProgress.propTypes = {
  drink: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
  }).isRequired,
  recipeIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeMeasures: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleIngredientToggle: PropTypes.func.isRequired,

};
export default DrinkInProgress;
