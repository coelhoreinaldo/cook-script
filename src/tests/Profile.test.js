// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from './renderWithRouter';
// import Provider from '../context/Provider';
// import Profile from '../pages/Profile';
// // import Login from '../pages/Login';

// // const email = 'trybe@trybe.com';
// // const senha = '1234567';
// // const testidEmail = 'email-input';
// // const testidSenha = 'password-input';

// describe('Testa a Página de Profile', () => {
// //   it('Deve testar se o texto email está na tela', () => {
// //     renderWithRouter(<Provider><Login /></Provider>);
// //     const emailInput = screen.getByTestId(testidEmail);
// //     const senhaInput = screen.getByTestId(testidSenha);
// //     userEvent.type(emailInput, email);
// //     userEvent.type(senhaInput, senha);
// //     const buttonEnter = screen.getByTestId('login-submit-btn');
// //     expect(buttonEnter).toBeInTheDocument();
// //     userEvent.click(buttonEnter);

// //     const buttonProfile = screen.getByRole('img', { name: /userimage/i });
// //     userEvent.click(buttonProfile);

// //     const emailProfile = screen.getByTestId('profile-email');
// //     expect(emailProfile).toEqual(emailInput);
// //   });
//   it('Deve testar se ao clicar no botão de Done Recipes, a aplicação é redirecionada para a página de receitas finalizadas, na URL /done-recipes', () => {
//     const { history } = renderWithRouter(<Provider><Profile /></Provider>);

//     const buttonDoneRecipes = screen.getByRole('button', { name: /done recipes/i });
//     expect(buttonDoneRecipes).not.toBeInTheDocument();
//     userEvent.click(buttonDoneRecipes);

//     const { pathname } = history.location;
//     expect(pathname).not.toBe('/done-recipes');
//   });
//   it('Deve testar se ao clicar no botão de Favorite Recipes, a aplicação é redirecionada para a página de receitas favoritas, na URL /favorite-recipes', () => {
//     const { history } = renderWithRouter(<Provider><Profile /></Provider>);

//     const buttonFavoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });
//     expect(buttonFavoriteRecipes).not.toBeInTheDocument();
//     userEvent.click(buttonFavoriteRecipes);

//     const { pathname } = history.location;
//     expect(pathname).not.toBe('/favorite-recipes');
//   });
//   it('Deve testar se ao clicar no botão de Logout, a aplicação é redirecionada para a página de login, na URL /', () => {
//     const { history } = renderWithRouter(<Provider><Profile /></Provider>);

//     const buttonLogout = screen.getByRole('button', { name: /logout/i });
//     expect(buttonLogout).not.toBeInTheDocument();
//     userEvent.click(buttonLogout);

//     const { pathname } = history.location;
//     expect(pathname).not.toBe('/');
//   });
// });
