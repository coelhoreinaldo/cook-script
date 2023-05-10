import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';

function FavoriteRecipes() {
  // const favoriteRecipes = [
  //   {
  //     id: '52977',
  //     type: 'meal',
  //     nationality: 'turkish',
  //     category: 'side',
  //     alcoholicOrNot: '',
  //     name: 'corba',
  //     image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  //   },
  //   {
  //     id: '15997',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Ordinary Drink',
  //     alcoholicOrNot: 'Optional alcohol',
  //     name: 'GG',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  //   },
  // ];

  const recovery = localStorage.getItem('favoriteRecipes');
  const newTeste = JSON.parse(recovery);

  // const copy = require('clipboard-copy');

  const handleShareClick = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    alert('Link copied!');
  };

  return (
    <div>
      <Header />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {newTeste && newTeste.map((e, index) => (
        <div key={ e.id }>
          <img
            width={ 144 }
            src={ e.image }
            alt={ e.nome }
            data-testid={ `${index}-horizontal-image` }
          />
          <h3 data-testid={ `${index}-horizontal-name` }>{e.name}</h3>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {e.alcoholicOrNot ? e.alcoholicOrNot : `${e.nationality} - ${e.category} `}
          </p>
          <button
            onClick={ () => handleShareClick(e.type, e.id) }
          >
            <img
              src={ shareIcon }
              alt=""
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <button>
            <img
              src={ blackHeartIcon }
              alt=""
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
