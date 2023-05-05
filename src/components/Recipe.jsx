import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeProvider';

function Recipe() {
  const { mealsData, drinksData } = useContext(RecipeContext);
  console.log(mealsData, drinksData);
  return (
    <div>
      meals e drink api prontas :D
    </div>
  );
}

export default Recipe;
