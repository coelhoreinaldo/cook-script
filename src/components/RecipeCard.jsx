import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeCard({ index, pathname, idRecipe, strRecipe, strRecipeThumb }) {
  return (
    <Link
      data-testid={ `${index}-recipe-card` }
      to={ `/${pathname}/${idRecipe}` }
    >
      <h3 data-testid={ `${index}-card-name` }>{strRecipe}</h3>
      <figure className="figure">

        <img
          width={ 144 }
          className="img-thumbnail figure-img img-fluid rounded"
          src={ strRecipeThumb }
          alt={ strRecipe }
          data-testid={ `${index}-card-img` }
        />
      </figure>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
  strRecipe: PropTypes.string.isRequired,
  strRecipeThumb: PropTypes.string.isRequired,
};

export default RecipeCard;
