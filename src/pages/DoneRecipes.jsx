import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareImage from '../images/shareIcon.svg';
import { DoneRecipesContext } from '../context/DoneRecipesProvider';
import '../style/DoneRecipes.css';

function DoneRecipes() {
  const { mockFilter, filterButton, showMessage, setShowMessage, copyUrl,
  } = useContext(DoneRecipesContext);
  const history = useHistory();
  const time = 5000;

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, time);
      return () => clearTimeout(timer);
    }
  }, [showMessage, setShowMessage]);

  return (
    <div>
      <Header />
      <nav>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterButton('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterButton('meals') }
        >
          Meals

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterButton('drinks') }
        >
          Drinks

        </button>
      </nav>
      <section className="done-recipes-container">
        {mockFilter && mockFilter.map((recipe, index) => (
          <div key={ index } className="recipe-page-card">
            <button onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }>
              <img
                width={ 150 }
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </button>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {/* {console.log(recipe.alcoholicOrNot !== '')} */}
              {recipe.alcoholicOrNot !== ''
                ? ` ${recipe.category} - ${recipe.alcoholicOrNot}`
                : `${recipe.nationality} - ${recipe.category}`}
            </h3>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <div className="buttons-container">
              <button
                onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </button>
              <button
                onClick={ () => copyUrl(recipe.type, recipe.id) }
              >
                {showMessage
                  ? <p>Link copied!</p>
                  : (
                    <img
                      src={ shareImage }
                      alt="Imagem para Compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />)}

              </button>
            </div>
            { mockFilter[index].tags.map((tag, i) => (
              <span
                className="recipe-tags"
                key={ i }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}

export default DoneRecipes;
