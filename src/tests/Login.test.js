import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';
import LoginProvider from '../context/LoginProvider';

const email = 'trybe@trybe.com';
const senha = '1234567';
const testidEmail = 'email-input';
const testidSenha = 'password-input';

describe('Testa a Página de Login', () => {
  it('Deve testar se os inputs de email e senha estão na tela', () => {
    renderWithRouter(<LoginProvider><Login /></LoginProvider>);

    const emailInput = screen.getByTestId(testidEmail);
    expect(emailInput).toBeInTheDocument();

    const senhaInput = screen.getByTestId(testidSenha);
    expect(senhaInput).toBeInTheDocument();
  });
  it('Deve testar se ao clicar no botão de Entrar, a aplicação é redirecionada para a página Meals, na URL /meals', () => {
    const { history } = renderWithRouter(<LoginProvider><Login /></LoginProvider>);

    const emailInput = screen.getByTestId(testidEmail);
    const senhaInput = screen.getByTestId(testidSenha);
    userEvent.type(emailInput, email);
    userEvent.type(senhaInput, senha);
    const buttonEnter = screen.getByRole('link', { name: /entrar/i });
    expect(buttonEnter).toBeInTheDocument();

    userEvent.click(buttonEnter);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
