import React from 'react';
import PropTypes from 'prop-types';
import RecipeProvider from './RecipeProvider';
import LoginProvider from './LoginProvider';
import SearchBarProvider from './SearchBarProvider';

function Provider({ children }) {
  return (
    <RecipeProvider>
      <LoginProvider>
        <SearchBarProvider>
          {children}
        </SearchBarProvider>
      </LoginProvider>
    </RecipeProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
