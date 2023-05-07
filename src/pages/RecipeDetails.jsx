import React, { useContext, useEffect } from 'react';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';

function RecipeDetails() {
  const { currentRecipe, getRecipeDetails } = useContext(RecipeDetailsContext);

  useEffect(() => {
    getRecipeDetails();
  }, []);

  console.log(currentRecipe);
  return (
    <div>
      Receita
    </div>
  );
}

export default RecipeDetails;
