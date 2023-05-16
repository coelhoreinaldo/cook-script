import { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import '../style/FavoriteRecipes.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [copyLink, setCopyLink] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    const recovery = localStorage.getItem('favoriteRecipes');
    return recovery ? JSON.parse(recovery) : [];
  });
  const [typeFilter, setTypeFilter] = useState('all');

  const removeFavoriteRecipeLocalStorage = (id) => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updatedFavorites = getFavoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    setFavoriteRecipes(updatedFavorites);
  };
  console.log(favoriteRecipes);

  const handleShareClick = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyLink(true);
  };

  const handleFilter = (type) => {
    setTypeFilter(type);
  };

  const filteredRecipes = typeFilter === 'all'
    ? favoriteRecipes
    : favoriteRecipes.filter((recipe) => recipe.type === typeFilter);

  return (
    <div>
      <Header />
      <nav>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilter('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilter('drink') }
        >
          Drinks
        </button>
      </nav>
      <section className="favorite-recipes-container">
        {filteredRecipes.map((e, index) => (
          <div
            key={ e.id }
            className="recipe-page-card"
          >
            <Link
              to={ `/${e.type}s/${e.id}` }
            >
              <img
                width={ 150 }
                src={ e.image }
                alt={ e.nome }
                data-testid={ `${index}-horizontal-image` }
              />
              <h3 data-testid={ `${index}-horizontal-name` }>{e.name}</h3>
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {e.alcoholicOrNot ? e.alcoholicOrNot : `${e.nationality} - ${e.category} `}
            </p>
            <div className="buttons-container">
              <button
                onClick={ () => handleShareClick(e.type, e.id) }
              >
                {copyLink ? <p>Link copied!</p> : (
                  <img
                    src={ shareIcon }
                    alt=""
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                )}

              </button>
              <button
                onClick={ () => removeFavoriteRecipeLocalStorage(e.id) }
              >
                <img
                  src={ blackHeartIcon }
                  alt=""
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
