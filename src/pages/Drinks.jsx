import React, { useContext } from 'react';
import Recipe from '../components/Recipe';
import { RecipeContext } from '../context/RecipeProvider';

function Drinks() {
  const { drinksData } = useContext(RecipeContext);
  return (
    <div>
      Drinks
      <Recipe drinksData={ drinksData } />
    </div>
  );
}

export default Drinks;
