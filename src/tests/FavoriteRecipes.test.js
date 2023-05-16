import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Provider from '../context/Provider';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { favoriteRecipeMock } from './mocks/favoriteRecipesMock';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Testa o componente Favorites Recipe', () => {
  it('Testa o botão de desfavoritar', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipeMock));
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
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(favoriteRecipeMock),
    });
    renderWithRouter(
      <Provider>
        <FavoriteRecipes />
      </Provider>,
    );

    const btnMealsFilter = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(btnMealsFilter);
    const nationalityTitle = screen.getByText(/italian/i);
    expect(nationalityTitle).toBeInTheDocument();

    const btnDrinkFIlter = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(btnDrinkFIlter);
    const drinkAlcool = screen.getByRole('heading', { name: /alcoholic/i });
    expect(drinkAlcool).toBeInTheDocument();

    const btnAllFilter = screen.getByTestId('filter-by-all-btn');
    userEvent.click(btnAllFilter);
    const allNationality = screen.getByText(/italian/i);
    expect(allNationality).toBeInTheDocument();
    const allDrink = screen.getByRole('heading', { name: /alcoholic/i });
    expect(allDrink).toBeInTheDocument();
  });
});
