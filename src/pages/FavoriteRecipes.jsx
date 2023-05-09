import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const teste = [{
    id: '52977',
    type: 'meal',
    nationality: 'turkish',
    category: 'side',
    alcoholicOrNot: '',
    name: 'corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  }];

  localStorage.setItem('teste', JSON.stringify(teste));
  const recovery = localStorage.getItem('teste');
  const newTeste = JSON.parse(recovery);
  console.log(newTeste);
  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {newTeste.map((e, index) => (
        <div key={ e.id }>
          <figure className="figure">
            <img
              width={ 144 }
              src={ e.image }
              alt={ e.nome }
              data-testid={ `${index}-horizontal-image` }
            />
          </figure>
          <h3 data-testid={ `${index}-horizontal-name` }>{e.nome}</h3>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${e.nationality}.${e.type} `}
          </p>
          <button data-testid={ `${index}-horizontal-share-btn` }>Share</button>
          <button data-testid={ `${index}-horizontal-favorite-btn` }>Favorite</button>
        </div>
      ))}

    </div>
  );
}

export default FavoriteRecipes;
