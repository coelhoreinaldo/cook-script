import React, { useContext } from 'react';
import Recipe from '../components/Recipe';
import { RecipeContext } from '../context/RecipeProvider';

function Meals() {
  const { mealsData } = useContext(RecipeContext);
  return (
    <div>
      Meals
      <Recipe mealsData={ mealsData } />
    </div>
  );
}

export default Meals;
