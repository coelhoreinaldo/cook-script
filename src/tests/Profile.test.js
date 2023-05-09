import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Provider from '../context/Provider';
import Profile from '../pages/Profile';
import Login from '../pages/Login';

const email = { email: 'trybe@trybe.com' };
const senha = '1234567';
const testidEmail = 'email-input';
const testidSenha = 'password-input';

describe('Testa a Página de Profile', () => {
  it('Deve testar se o email do usuário é renderizado na tela ', () => {
    const { history } = renderWithRouter(<Provider><Login /></Provider>);
    const emailInput = screen.getByTestId(testidEmail);
    const senhaInput = screen.getByTestId(testidSenha);
    userEvent.type(emailInput, email.email);
    userEvent.type(senhaInput, senha);

    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(buttonEnter).toBeInTheDocument();
    userEvent.click(buttonEnter);
    console.log(history.location.pathname);
    const buttonProfile = screen.getByAltText(/userimage/i);
    userEvent.click(buttonProfile);
    console.log(history.location.pathname);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement.innerHTML).toEqual(emailInput || '');
  });
  it('Deve testar se ao clicar no botão de Done Recipes, a aplicação é redirecionada para a página de receitas finalizadas, na URL /done-recipes', () => {
    const { history } = renderWithRouter(<Provider><Profile /></Provider>);

    const buttonDoneRecipes = screen.getByRole('button', { name: /done recipes/i });
    expect(buttonDoneRecipes).toBeInTheDocument();
    userEvent.click(buttonDoneRecipes);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  it('Deve testar se ao clicar no botão de Favorite Recipes, a aplicação é redirecionada para a página de receitas favoritas, na URL /favorite-recipes', () => {
    const { history } = renderWithRouter(<Provider><Profile /></Provider>);

    const buttonFavoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    expect(buttonFavoriteRecipes).toBeInTheDocument();
    userEvent.click(buttonFavoriteRecipes);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('Deve testar se ao clicar no botão de Logout, a aplicação é redirecionada para a página de login, na URL /', () => {
    const { history } = renderWithRouter(<Provider><Profile /></Provider>);

    const buttonLogout = screen.getByRole('button', { name: /logout/i });
    expect(buttonLogout).toBeInTheDocument();
    userEvent.click(buttonLogout);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
