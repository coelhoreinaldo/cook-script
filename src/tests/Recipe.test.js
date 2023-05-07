import React from 'react';
import { screen } from '@testing-library/react';
import RecipeProvider from '../context/RecipeProvider';
import renderWithRouter from './helpers/renderWithRouter';
import meals from './mocks/meals';
// import drinks from './mocks/drinks';
import mealsCategories from './mocks/mealsCategories';
// import drinksCategories from './mocks/drinksCategories';
// import Meals from '../pages/Meals';
import App from '../App';

describe('the meals component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => (meals),
    }).mockResolvedValueOnce({
      json: async () => (mealsCategories),
    });
  });

  it('should fetch twice on page load', async () => {
    renderWithRouter(<RecipeProvider><App /></RecipeProvider>, { initialEntries: ['/meals'] });
    expect(fetch).toHaveBeenCalledTimes(2);

    const loadingEl = screen.getByRole('status');
    expect(loadingEl).toBeInTheDocument();

    const breakFastBtn = await screen.findByRole('button', { name: /breakfast/i });
    expect(breakFastBtn).toBeInTheDocument();

    const corbaMeal = await screen.findByRole('heading', { name: /corba/i });
    expect(corbaMeal).toBeInTheDocument();
  });
});
