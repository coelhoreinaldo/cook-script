import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipeProvider from './context/RecipeProvider';
import SearchBarProvider from './context/SearchBarProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <RecipeProvider>
        <SearchBarProvider>
          <App />
        </SearchBarProvider>
      </RecipeProvider>
    </BrowserRouter>,
  );

serviceWorker.unregister();
