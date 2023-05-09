import React from 'react';
import PropTypes from 'prop-types';
import RecipeProvider from './RecipeProvider';
import LoginProvider from './LoginProvider';
import SearchBarProvider from './SearchBarProvider';
import RecipeDetailsProvider from './RecipeDetailsProvider';
import ProfileProvider from './ProfileProvider';

function Provider({ children }) {
  return (
    <LoginProvider>
      <SearchBarProvider>
        <RecipeProvider>
          <RecipeDetailsProvider>
            <ProfileProvider>
              {children}
            </ProfileProvider>
          </RecipeDetailsProvider>
        </RecipeProvider>
      </SearchBarProvider>
    </LoginProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
