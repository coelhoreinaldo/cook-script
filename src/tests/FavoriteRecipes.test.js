import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Provider from '../context/Provider';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { favoriteRecipeMock } from './mocks/favoriteRecipesMock';

jest.mock('clipboard-copy');

// const localStorageMock = (() => {
//   let store = {};

//   return {
//     getItem: (key) => store[key] || null,
//     setItem: (key, value) => {
//       store[key] = value.toString();
//     },
//     removeItem: (key) => {
//       delete store[key];
//     },
//     clear: () => {
//       store = {};
//     },
//   };
// })();

// Object.defineProperty(window, 'localStorage', {
//   value: localStorageMock,
// });

describe('Testa o componente Favorites Recipe', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipeMock));
  });
  afterEach(() => {
    localStorage.clear();
  });
  it('Testa o botão de desfavoritar', () => {
    // localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipeMock));
    renderWithRouter(
      <Provider>
        <FavoriteRecipes />
      </Provider>,
    );

    const btnDisfavor = screen.getByTestId('0-horizontal-favorite-btn');
    expect(btnDisfavor).toBeInTheDocument();
    userEvent.click(btnDisfavor);
    const idToRemove = '52771';
    const updatedFavorites = favoriteRecipeMock
      .filter((element) => element.id !== idToRemove);
    localStorage.removeItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    expect(localStorage.getItem('favoriteRecipes')).toBeNull();
  });
  it('Testando botão share', async () => {
    renderWithRouter(
      <Provider>
        <FavoriteRecipes />
      </Provider>,
    );

    const btnMealsFilter = screen.getByTestId('filter-by-meal-btn');
    expect(btnMealsFilter).toBeInTheDocument();
    userEvent.click(btnMealsFilter);
    const mealTitle = await screen.findByText(/spicy/i);
    expect(mealTitle).toBeInTheDocument();

    const btnDrinkFIlter = screen.getByTestId('filter-by-drink-btn');
    expect(btnDrinkFIlter).toBeInTheDocument();

    userEvent.click(btnDrinkFIlter);
    const drinkAlcool = screen.getByTestId('0-horizontal-top-text');
    expect(drinkAlcool).toBeInTheDocument();

    const btnAllFilter = screen.getByTestId('filter-by-all-btn');
    expect(btnAllFilter).toBeInTheDocument();

    userEvent.click(btnAllFilter);
    const allNationality = await screen.findByText(/italian/i);
    expect(allNationality).toBeInTheDocument();
    const allDrink = screen.getByTestId('1-horizontal-top-text');
    expect(allDrink).toBeInTheDocument();
  });

  it('', async () => {
    renderWithRouter(
      <Provider>
        <FavoriteRecipes />
      </Provider>,
    );
    const shareBtn = await screen.findByTestId('1-horizontal-share-btn');
    userEvent.click(shareBtn);
  });
});
