import React from 'react';
import PropTypes from 'prop-types';

function DrinkDetails({
  strDrinkThumb, strDrink, strCategory, strAlcoholic,
  recipeIngredients, recipeMeasures, strInstructions, imgClass,
}) {
  return (
    <>
      <section className="img-title">
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
          className={ imgClass }
        />
        <h2 data-testid="recipe-title" className="recipe-title">{ strDrink }</h2>
      </section>
      <h3 data-testid="recipe-category" className="recipe-category">
        { strCategory }
        { ' - ' }
        { strAlcoholic }
      </h3>
      <hr />
      <section className="ingredients">
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          <div>
            { recipeIngredients.map((ing, i) => (
              <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                { ing }
              </li>)) }
          </div>
          <div>
            { recipeMeasures.map((ing, i) => (
              <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                { ing }
              </li>)) }
          </div>
        </ul>
      </section>
      <section className="instructions">
        <h3>Instructions</h3>
        <p data-testid="instructions">{ strInstructions }</p>
      </section>
    </>

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
  imgClass: PropTypes.string.isRequired,
};

export default DrinkDetails;
