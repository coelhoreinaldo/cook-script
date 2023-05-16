// export const recipesInProgressStorage = {
//   drinks: {
//     15997: [1, 2, 3],
//   },
//   meals: {
//     52977: [1, 2, 3],
//     52771: [1, 2, 3],
//   },
// };

export const recipesInProgressStorage = {
  drinks: {
    15997: [
      'Galliano',
      'Ginger ale',
      'Ice',
    ],
  },
  meals: {
    52977: [
      'Water',
      'Vegetable Stock',
      'Red Pepper Flakes',
      'Black Pepper',
      'Thyme',
      'Mint',
      'Paprika',
      'Cumin',
      'Tomato Puree',
      'Carrots',
      'Onion',
      'Lentils',
    ],
    52771: [1, 2, 3],
  },
};

const ordinaryDrink = 'Ordinary Drink';
const optionalAlcohol = 'Optional alcohol';
const ggDrinkImage = 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg';

export const doneRecipesStorage = [{
  id: '15997',
  type: 'drink',
  nationality: '',
  category: ordinaryDrink,
  alcoholicOrNot: optionalAlcohol,
  name: 'GG',
  image: ggDrinkImage,
  doneDate: '2020',
  tags: ['teste', 'teste'],
},
{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '2020',
  tags: ['teste', 'teste'],
},
];

export const doneRecipesStorage2 = [{
  id: '21332',
  type: 'drink',
  nationality: '',
  category: ordinaryDrink,
  alcoholicOrNot: optionalAlcohol,
  name: 'GG',
  image: ggDrinkImage,
  doneDate: '2020',
  tags: ['teste', 'teste'],
},
{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Teste',
  image: 'https://www.themealdb.com/images/media/meals/testeee.jpg',
  doneDate: '2020',
  tags: ['teste', 'teste'],
},
];

export const favoriteRecipesStorage = [
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: ordinaryDrink,
    alcoholicOrNot: optionalAlcohol,
    name: 'GG',
    image: ggDrinkImage,
  },
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },

];
