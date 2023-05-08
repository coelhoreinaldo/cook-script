import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchBarContext = createContext();

function SearchBarProvider({ children }) {
  const [searchBarVisible, setsearchBarVisible] = useState(false);

  const changeVisibility = () => {
    setsearchBarVisible((prevState) => !prevState);
  };

  const values = useMemo(() => ({
    searchBarVisible,
    changeVisibility,
  }), [searchBarVisible]);

  return (
    <SearchBarContext.Provider value={ values }>
      <div>
        {children}
      </div>
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchBarProvider;
