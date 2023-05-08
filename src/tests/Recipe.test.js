import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import mealsCategories from './mocks/mealsCategories';
import drinksCategories from './mocks/drinksCategories';
import App from '../App';
import Provider from '../context/Provider';
// import corbaMealDetails from './mocks/corbaMealDetails';
// import filteredByBeef from './mocks/mealsFilteredBeef';
// import filteredByCocktail from './mocks/drinksFilteredCocktail';

// import errorMessage from './mocks/errorMessage';

describe('the recipe component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => (meals),
    }).mockResolvedValueOnce({
      json: async () => (mealsCategories),
    }).mockResolvedValueOnce({
      json: async () => (drinks),
    })
      .mockResolvedValueOnce({
        json: async () => (drinksCategories),
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
  it('should redirect to items recipes page', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/drinks'] });

    const loadingEl = screen.getByRole('status');
    expect(loadingEl).toBeInTheDocument();

    const ordinaryDrinkBtn = await screen.findByRole('button', { name: /ordinary/i });
    expect(ordinaryDrinkBtn).toBeInTheDocument();
    const ggDrink = await screen.findByRole('heading', { name: /GG/i });
    expect(ggDrink).toBeInTheDocument();
    userEvent.click(ordinaryDrinkBtn);
  });
});
