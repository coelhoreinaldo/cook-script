import React, { useState, useEffect, useMemo, createContext, useCallback } from 'react';
import PropTypes from 'prop-types';

export const DoneRecipesContext = createContext();

function DoneRecipesProvider({ children }) {
  const [mock, setMock] = useState([]);
  const [mockFilter, setMockFilter] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const retornoLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    setMock(retornoLocal);
    setMockFilter(retornoLocal);
  }, []);
  const filterButton = useCallback((retorno) => {
    if (retorno === 'all') {
      setMockFilter(mock);
    }
    if (retorno === 'meals') {
      setMockFilter(mock.filter((recipe) => recipe.type === 'meal'));
    }
    if (retorno === 'drinks') {
      setMockFilter(mock.filter((recipe) => recipe.type === 'drink'));
    }
  }, [mock]);

  const copyUrl = useCallback((type, id) => {
    const recipeUrl = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(recipeUrl);
    setShowMessage(true);
  }, []);

  const valor = useMemo(() => ({
    filterButton,
    mockFilter,
    showMessage,
    setShowMessage,
    copyUrl,
  }), [filterButton, mockFilter, showMessage, setShowMessage, copyUrl]);
  return (
    <DoneRecipesContext.Provider value={ valor }>
      <div>
        { children }
      </div>
    </DoneRecipesContext.Provider>
  );
}
DoneRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DoneRecipesProvider;
