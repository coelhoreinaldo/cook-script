import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';
import fetchMock from '../../cypress/mocks/fetch';
import DoneRecipesProvider from '../context/DoneRecipesProvider';

describe('the recipe in progress component', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    const { history } = renderWithRouter(
      <Provider>
        <DoneRecipesProvider>
          <App />
        </DoneRecipesProvider>
      </Provider>,
      { initialEntries: ['/drinks/15997'] },
    );

    const title = await screen.findByRole('heading', { name: /gg/i });
    expect(title).toBeInTheDocument();

    const startBtn = await screen.findByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });

  it('should have the elements on the screen', async () => {
    const title = await screen.findByRole('heading', { name: /gg/i });
    expect(title).toBeInTheDocument();

    const ingredient1 = await screen.findByTestId('0-ingredient-step');
    const ingredient2 = screen.getByTestId('1-ingredient-step');
    const ingredient3 = screen.getByTestId('2-ingredient-step');
    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
    expect(ingredient3).toBeInTheDocument();

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    const linkCopiedEl = screen.queryByText(/link copied/i);
    expect(linkCopiedEl).not.toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');

    const finishBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishBtn).toBeInTheDocument();
  });
});
