import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Footer', () => {
  it('Testa se existem dois botões', () => {
    render(<Footer />);
    const allBtns = screen.getAllByRole('button');
    expect(allBtns[0]).toBeInTheDocument();
    expect(allBtns[1]).toBeInTheDocument();
  });

  it('Testa se o botão Drink redireciona para a rota "/drinks"', () => {
    const { history } = renderWithRouter(<Footer />);
    const allBtns = screen.getAllByRole('button');
    userEvent.click(allBtns[0]);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('Testa se o botão Meals redireciona para a rota "/meals"', () => {
    const { history } = renderWithRouter(<Footer />);
    const allBtns = screen.getAllByRole('button');
    userEvent.click(allBtns[1]);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
