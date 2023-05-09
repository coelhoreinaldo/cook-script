import React from 'react';

function DrinkDetails(props) {
  return (
    <div>
      <section key={ e.idDrink }>
        <img
          src={ e.strDrinkThumb }
          alt={ e.strDrink }
          data-testid="recipe-photo"
          width={ 260 }
        />
        <h2 data-testid="recipe-title">{ e.strDrink }</h2>
        <h3 data-testid="recipe-category">
          { e.strCategory }
          { ' ' }
          { e.strAlcoholic }
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
        <p data-testid="instructions">{ e.strInstructions }</p>
      </section>
    </div>
  );
}

export default DrinkDetails;
