import React from 'react';
import PropTypes from 'prop-types';
import RecipeProvider from './RecipeProvider';
import LoginProvider from './LoginProvider';
import SearchBarProvider from './SearchBarProvider';
import RecipeDetailsProvider from './RecipeDetailsProvider';
import ProfileProvider from './ProfileProvider';

function Provider({ children }) {
  return (
    <RecipeProvider>
      <RecipeDetailsProvider>
        <LoginProvider>
          <ProfileProvider>
            <SearchBarProvider>
              {children}
            </SearchBarProvider>
          </ProfileProvider>
        </LoginProvider>
      </RecipeDetailsProvider>
    </RecipeProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
