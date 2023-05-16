import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';
import fetchMock from '../../cypress/mocks/fetch';
import DoneRecipesProvider from '../context/DoneRecipesProvider';
import { doneRecipesStorage, doneRecipesStorage2, favoriteRecipesStorage, recipesInProgressStorage } from './mocks/localStorageMocks';

jest.mock('clipboard-copy');

const startRecipeTestId = 'start-recipe-btn';
const whiteHeartIcon = 'whiteHeartIcon.svg';
const blackHeartIcon = 'blackHeartIcon.svg';
const ingredientStep0 = '0-ingredient-step';
const finishRecipeId = 'finish-recipe-btn';

let history;

describe('the recipe in progress component', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    const render = renderWithRouter(
      <Provider>
        <DoneRecipesProvider>
          <App />
        </DoneRecipesProvider>
      </Provider>,
      { initialEntries: ['/drinks/15997'] },
    );

    history = render.history;

    await waitForElementToBeRemoved(() => screen.getByRole('status'));

    const title = await screen.findByRole('heading', { name: /gg/i });
    expect(title).toBeInTheDocument();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should have the elements on the screen', async () => {
    const startBtn = await screen.findByTestId(startRecipeTestId);
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    await waitForElementToBeRemoved(() => screen.getByRole('status'));

    const title = await screen.findByRole('heading', { name: /gg/i });
    expect(title).toBeInTheDocument();

    const ingredient1 = await screen.findByTestId(ingredientStep0);
    const ingredient2 = screen.getByTestId('1-ingredient-step');
    const ingredient3 = screen.getByTestId('2-ingredient-step');
    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
    expect(ingredient3).toBeInTheDocument();

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    const linkCopiedEl = screen.queryByText(/link copied/i);
    expect(linkCopiedEl).not.toBeInTheDocument();

    const favoriteBtn = screen.getByRole('img', {
      name: /favorite icon/i,
    });
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', blackHeartIcon);

    const finishBtn = screen.getByTestId(finishRecipeId);
    expect(finishBtn).toBeInTheDocument();
  });
  it('should verify if drink recipe is favorite', async () => {
    const startBtn = await screen.findByTestId(startRecipeTestId);
    userEvent.click(startBtn);
    await waitForElementToBeRemoved(() => screen.getByRole('status'));

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesStorage));
    userEvent.click(favoriteBtn);
  });

  it('should verify if finish button is only available when all checkboxes are checked', async () => {
    const startBtn = await screen.findByTestId(startRecipeTestId);
    userEvent.click(startBtn);
    const finishBtn = await screen.findByTestId(finishRecipeId);

    expect(finishBtn).toBeDisabled();
    const ingredient1 = screen.getByTestId(ingredientStep0);
    userEvent.click(ingredient1);
    expect(finishBtn).toBeDisabled();
    const ingredient2 = screen.getByTestId('1-ingredient-step');
    userEvent.click(ingredient2);
    expect(finishBtn).toBeDisabled();
    const ingredient3 = screen.getByTestId('2-ingredient-step');
    userEvent.click(ingredient3);
    expect(finishBtn).toBeEnabled();
    userEvent.click(ingredient3);
    expect(finishBtn).toBeDisabled();
    userEvent.click(ingredient3);
    expect(finishBtn).toBeEnabled();

    userEvent.click(finishBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('should verify if checkbox belongs checked', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgressStorage));
    const startBtn = await screen.findByTestId(startRecipeTestId);
    userEvent.click(startBtn);
    const finishBtn = await screen.findByTestId(finishRecipeId);

    expect(finishBtn).toBeEnabled();
    const ingredient1 = screen.getByTestId(ingredientStep0);
    userEvent.click(ingredient1);
    expect(finishBtn).toBeDisabled();
  });

  it('should verify if share button copy the link', async () => {
    const startBtn = await screen.findByTestId(startRecipeTestId);
    userEvent.click(startBtn);
    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);
  });

  it('should add recipe to localStorage when finishbutton is clicked', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgressStorage));
    const startBtn = await screen.findByTestId(startRecipeTestId);
    userEvent.click(startBtn);
    const finishBtn = await screen.findByTestId(finishRecipeId);
    expect(finishBtn).toBeEnabled();
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesStorage));
    userEvent.click(finishBtn);
  });
  it('should add recipe to localStorage when finishbutton is clicked and there is no recipe in localstorage', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgressStorage));
    const startBtn = await screen.findByTestId(startRecipeTestId);
    userEvent.click(startBtn);
    const finishBtn = await screen.findByTestId(finishRecipeId);
    expect(finishBtn).toBeEnabled();
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesStorage2));
    userEvent.click(finishBtn);
  });
});

describe('the meal recipe in progress component', () => {
  beforeEach(async () => {
    localStorage.clear();
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    const render = renderWithRouter(
      <Provider>
        <DoneRecipesProvider>
          <App />
        </DoneRecipesProvider>
      </Provider>,
      { initialEntries: ['/meals/52977'] },
    );
    history = render.history;

    await waitForElementToBeRemoved(() => screen.getByRole('status'));

    const title = await screen.findByRole('heading', { name: /spicy/i });
    expect(title).toBeInTheDocument();

    const startBtn = await screen.findByTestId(startRecipeTestId);
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });
  it('should verify if meal recipe is favorite', async () => {
    await waitForElementToBeRemoved(() => screen.getByRole('status'));

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', blackHeartIcon);
  });
  it('should add recipe to localStorage when finishbutton is clicked', async () => {
    const finishBtn = await screen.findByTestId(finishRecipeId);
    const getIngredients = await screen.findAllByTestId(/ingredient-step/i);
    getIngredients.forEach((ingr) => {
      userEvent.click(ingr);
    });
    expect(finishBtn).toBeEnabled();
    userEvent.click(finishBtn);
  });
});
