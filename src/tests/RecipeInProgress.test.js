import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';
import fetchMock from '../../cypress/mocks/fetch';

describe('the recipe in progress component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  it('should ', async () => {
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: ['/meals'] });
  });
});
