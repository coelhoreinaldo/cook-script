import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipeProvider from './context/RecipeProvider';
import RecipeDetailsProvider from './context/RecipeDetailsProvider';
import SearchBarProvider from './context/SearchBarProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <SearchBarProvider>
        <RecipeProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipeProvider>
      </SearchBarProvider>
    </BrowserRouter>,
  );

serviceWorker.unregister();
