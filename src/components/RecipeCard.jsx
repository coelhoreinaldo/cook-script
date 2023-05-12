import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeCard({
  index, pathname, idRecipe, strRecipe, strRecipeThumb,
  dataTestId, dataTestIdTitle, cardClass,
}) {
  return (
    <Link
      className={ cardClass }
      data-testid={ dataTestId }
      to={ `/${pathname}/${idRecipe}` }
    >
      <h3 data-testid={ dataTestIdTitle }>{strRecipe}</h3>
      <img
        width={ 150 }
        src={ strRecipeThumb }
        alt={ strRecipe }
        data-testid={ `${index}-card-img` }
      />
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
  strRecipe: PropTypes.string.isRequired,
  strRecipeThumb: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  dataTestIdTitle: PropTypes.string.isRequired,
  cardClass: PropTypes.string.isRequired,
};

export default RecipeCard;
