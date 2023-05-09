import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import Meals from './pages/Meals';
import RecipesInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/meals/:id-da-receita/in-progress"
        component={ RecipesInProgress }
      />
      <Route
        exact
        path="/drinks/:id-da-receita/in-progress"
        component={ RecipesInProgress }
      />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
