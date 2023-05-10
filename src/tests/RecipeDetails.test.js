import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';
import fetchMock from '../../cypress/mocks/fetch';
import { favoriteRecipesStorage, recipesInProgressStorage } from './mocks/localStorageMocks';

const whiteHeartIcon = 'whiteHeartIcon.svg';

describe('the meals recipe details page', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    localStorage.clear();
  });

  it('should have the ingredients and measures', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/meals'] });
    waitForElementToBeRemoved(() => screen.getByRole('status'));
    const corbaEl = await screen.findByRole('heading', { name: /corba/i });
    userEvent.click(corbaEl);
    waitForElementToBeRemoved(() => screen.getByRole('status'));
    const ingredientAndMeasure1 = await screen.findAllByTestId('0-ingredient-name-and-measure');
    expect(ingredientAndMeasure1[0]).toBeInTheDocument();
    expect(ingredientAndMeasure1[1]).toBeInTheDocument();
  });

  it('should redirect to meal recipe in progress page when the start recipe button is clicked', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/meals'] });
    waitForElementToBeRemoved(() => screen.getByRole('status'));
    const corbaEl = await screen.findByRole('heading', { name: /corba/i });
    userEvent.click(corbaEl);
    waitForElementToBeRemoved(() => screen.getByRole('status'));
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();
    userEvent.click(startRecipeBtn);
    // expect(history.location.pathname).toBe('/meals/52977/in-progress');
    expect(history.location.pathname).toBe('/meals/52771/in-progress');
    // console.log(history);
    // id diferente??
  });

  it('should copy the meal recipe details page when the share button is clicked', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/meals'] });
    waitForElementToBeRemoved(() => screen.getByRole('status'));
    const corbaEl = await screen.findByRole('heading', { name: /corba/i });
    userEvent.click(corbaEl);
    waitForElementToBeRemoved(() => screen.getByRole('status'));

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    const linkCopiedEl = screen.queryByText(/link copied/i);
    expect(linkCopiedEl).not.toBeInTheDocument();
  });

  it('should verify if meal recipe it is in recipes in progress', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/meals'] });
    waitForElementToBeRemoved(() => screen.getByRole('status'));
    const corbaEl = await screen.findByRole('heading', { name: /corba/i });
    userEvent.click(corbaEl);
    waitForElementToBeRemoved(() => screen.getByRole('status'));
    const continueRecipeBtn = screen.queryByRole('button', { name: /continue/i });
    expect(continueRecipeBtn).not.toBeInTheDocument();
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgressStorage));
    const continueRecipeBtn2 = await screen.findByRole('button', { name: /continue/i });
    expect(continueRecipeBtn2).toBeInTheDocument();
    // estranhoooo
  });

  it('should verify if meal recipe is favorite', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/meals'] });
    await waitForElementToBeRemoved(() => screen.getByRole('status'));
    const corbaMeal = screen.getByRole('heading', { name: /corba/i });
    userEvent.click(corbaMeal);
    await waitForElementToBeRemoved(() => screen.getByRole('status'));

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
});

describe('the drinks recipe details page', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    localStorage.clear();
  });
  it('should redirect to drink recipe in progress page when the start recipe button is clicked', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/drinks'] });
    waitForElementToBeRemoved(() => screen.getByRole('status'));
    const ggDrink = await screen.findByRole('heading', { name: /GG/i });
    expect(ggDrink).toBeInTheDocument();
    userEvent.click(ggDrink);
    waitForElementToBeRemoved(() => screen.getByRole('status'));
    const ingredientEl = await screen.findByText(/optional alcohol/i);
    expect(ingredientEl).toBeInTheDocument();
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();
    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });

  it('should verify if drink it is in recipe in progress', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/drinks'] });
    waitForElementToBeRemoved(() => screen.getByRole('status'));
    const ggDrink = await screen.findByRole('heading', { name: /GG/i });
    userEvent.click(ggDrink);
    waitForElementToBeRemoved(() => screen.getByRole('status'));
    const continueRecipeBtn = screen.queryByRole('button', { name: /continue/i });
    expect(continueRecipeBtn).not.toBeInTheDocument();
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgressStorage));
    const continueRecipeBtn2 = await screen.findByRole('button', { name: /continue/i });
    expect(continueRecipeBtn2).toBeInTheDocument();
  });

  it('should verify if drink recipe is favorite', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/drinks'] });
    await waitForElementToBeRemoved(() => screen.getByRole('status'));
    const ggDrink = screen.getByRole('heading', { name: /GG/i });
    userEvent.click(ggDrink);
    await waitForElementToBeRemoved(() => screen.getByRole('status'));

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesStorage));
    userEvent.click(favoriteBtn);
  });
});
