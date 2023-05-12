import { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const InProgressContext = createContext();

function InProgressProvider({ children }) {
  const [recipeProgress, setRecipeProgress] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const handleIngredientToggle = useCallback((e, index) => {
    if (e.target.checked) {
      setCheckedIngredients([...checkedIngredients, index]);
    } else {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== index));
    }
  });

  const values = useMemo(() => ({
    recipeProgress,
    setRecipeProgress,
    checkedIngredients,
    setCheckedIngredients,
    handleIngredientToggle,
  }), [recipeProgress,
    setRecipeProgress,
    checkedIngredients,
    setCheckedIngredients,
    handleIngredientToggle]);

  return (
    <InProgressProvider.Provider value={ values }>
      {children}
    </InProgressProvider.Provider>
  );
}

InProgressProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
