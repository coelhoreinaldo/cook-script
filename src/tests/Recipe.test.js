import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';
import fetchMock from '../../cypress/mocks/fetch';

describe('the recipe component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  it('should fetch twice on meals page load', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/meals'] });
    expect(fetch).toHaveBeenCalledTimes(2);

    const loadingEl = screen.getByRole('status');
    expect(loadingEl).toBeInTheDocument();

    const breakFastBtn = await screen.findByRole('button', { name: /breakfast/i });
    expect(breakFastBtn).toBeInTheDocument();

    const corbaMeal = await screen.findByRole('heading', { name: /corba/i });
    expect(corbaMeal).toBeInTheDocument();
  });
  it('should fetch twice on drinks page load', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/drinks'] });
    expect(fetch).toHaveBeenCalledTimes(2);

    const loadingEl = screen.getByRole('status');
    expect(loadingEl).toBeInTheDocument();

    const ordinaryDrinkBtn = await screen.findByRole('button', { name: /ordinary/i });
    expect(ordinaryDrinkBtn).toBeInTheDocument();

    const ggDrink = await screen.findByRole('heading', { name: /GG/i });
    expect(ggDrink).toBeInTheDocument();
  });
  it('should redirect to items recipes page from drinks page', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/drinks'] });

    const loadingEl = screen.getByRole('status');
    expect(loadingEl).toBeInTheDocument();

    const ordinaryDrinkBtn = await screen.findByRole('button', { name: /ordinary/i });
    expect(ordinaryDrinkBtn).toBeInTheDocument();
    const ggDrink = await screen.findByRole('heading', { name: /GG/i });
    expect(ggDrink).toBeInTheDocument();
    userEvent.click(ordinaryDrinkBtn);

    const mileLongIsland = await screen.findByRole('heading', { name: /long island iced tea/i });
    expect(mileLongIsland).toBeInTheDocument();
  });
});

// const allBtn = await screen.findByTestId('All-category-filter');
// expect(allBtn).toBeInTheDocument();
