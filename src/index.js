import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipeProvider from './context/RecipeProvider';
import LoginProvider from './context/LoginProvider';
import SearchBarProvider from './context/SearchBarProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <RecipeProvider>
        <LoginProvider>
          <SearchBarProvider>
            <App />
          </SearchBarProvider>
        </LoginProvider>
      </RecipeProvider>
    </BrowserRouter>,
  );

serviceWorker.unregister();
