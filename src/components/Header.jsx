import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { SearchBarContext } from '../context/SearchBarProvider';
import SearchBar from './SearchBar';

function Header() {
  const { searchBarVisible, changeVisibility } = useContext(SearchBarContext);

  const history = useHistory();
  const location = history.location.pathname
    .split('').filter((_e, index) => index !== 0).join('');
  const title = location.includes('-')
    ? location.split('-').join(' ').replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase())
    : location[0].toUpperCase() + location.substring(1);

  const withoutSearch = ['profile', 'done-recipes', 'favorite-recipes'];
  return (
    <header>
      {/* lógica de renderização */}
      <button type="button" onClick={ () => history.push('/profile') }>
        <img src={ profileIcon } alt="userImage" data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">{title}</h1>
      {!(withoutSearch.includes(location))
        && (
          <button type="button" onClick={ changeVisibility }>
            <img src={ searchIcon } alt="pesquisar" data-testid="search-top-btn" />
          </button>
        )}
      {searchBarVisible && <SearchBar />}
    </header>
  );
}

export default Header;
