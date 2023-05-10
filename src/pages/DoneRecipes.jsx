import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareImage from '../images/shareIcon.svg';
import { DoneRecipesContext } from '../context/DoneRecipesProvider';

const doneRecipesMock = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];
function DoneRecipes() {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
  const { mockFilter, filterButton, showMessage, setShowMessage, copyUrl,
  } = useContext(DoneRecipesContext);
  const history = useHistory();
  const time = 5000;
  const alcoholic = mockFilter.some((recipe) => recipe.alcoholicOrNot !== '');

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
      <section>
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
      </section>
      <section>
        {mockFilter.map((recipe, index) => (
          <div key={ index }>
            <button onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }>
              <img
                width={ 350 }
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </button>
            <h1 data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}

            </h1>
            {alcoholic
              ? (
                <h1 data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.alcoholicOrNot}

                </h1>) : ''}
            <button
              onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}

            </button>
            <h1 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h1>
            {showMessage && <h1>Link copied!</h1>}
            <button
              onClick={ () => copyUrl(recipe.type, recipe.id) }
            >
              <img
                src={ shareImage }
                alt="Imagem para Compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>

            { mockFilter[index].tags.map((tag, i) => (
              <span
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
