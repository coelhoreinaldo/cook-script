import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import RecipeProvider from '../context/RecipeProvider';
import SearchBarProvider from '../context/SearchBarProvider';

const testIDTitle = 'page-title';
describe('<Header />', () => {
  it('Should present title according to the route', async () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </SearchBarProvider>,
    );
    act(() => {
      history.push('/meals');
    });

    const titleEl = await screen.findByTestId(testIDTitle);
    expect(titleEl.innerHTML).toBe('Meals');

    act(() => {
      history.push('/drinks');
    });

    const titleEl2 = await screen.findByTestId(testIDTitle);
    expect(titleEl2.innerHTML).toBe('Drinks');

    act(() => {
      history.push('/done-recipes');
    });

    const titleEl3 = await screen.findByTestId(testIDTitle);
    expect(titleEl3.innerHTML).toBe('Done Recipes');

    act(() => {
      history.push('/favorite-recipes');
    });

    const titleEl4 = await screen.findByTestId(testIDTitle);
    expect(titleEl4.innerHTML).toBe('Favorite Recipes');
  });

  it('Should redirect to the route "/profile" after clicking the profile button ', () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </SearchBarProvider>,
    );
    act(() => {
      history.push('/meals');
    });

    const profileBnEl = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBnEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Should show the search input after clicking the search button ', async () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </SearchBarProvider>,
    );
    act(() => {
      history.push('/meals');
    });

    const searchBnEl = screen.getByTestId('search-top-btn');
    userEvent.click(searchBnEl);

    const searchInputEl = await screen.findByTestId('search-input');
    expect(searchInputEl).toBeInTheDocument();
  });
});
