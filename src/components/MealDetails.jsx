import React from 'react';
import PropTypes from 'prop-types';

function MealDetails({
  strMealThumb, strMeal, strCategory,
  recipeIngredients, recipeMeasures, strInstructions, strYoutube, imgClass,
}) {
  return (
    <section>
      <section className="img-title">
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid="recipe-photo"
          width={ 260 }
          className={ imgClass }
        />
        <h2 data-testid="recipe-title" className="recipe-title">{ strMeal }</h2>
      </section>
      <h3 data-testid="recipe-category">{ strCategory }</h3>
      <section>
        <h3>Ingredients</h3>
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
      </section>
      <section>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ strInstructions }</p>
      </section>
      <section>
        <h3>Video</h3>
        <iframe
          title="Recipe"
          width="260"
          data-testid="video"
          allowFullScreen
          src={ strYoutube }
        />
      </section>
    </section>
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
  imgClass: PropTypes.string.isRequired,
};

export default MealDetails;
