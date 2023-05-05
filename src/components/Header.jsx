import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = window.location.pathname.slice(1);
  const title = location.includes('-')
    ? location.split('-').join(' ').replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase())
    : location[0].toUpperCase() + location.substring(1);

  const withoutSearch = ['profile', 'done-recipes', 'favorite-recipes'];
  const history = useHistory();
  console.log(history);
  return (
    <header>
      {/* lógica de renderização */}
      <button type="button" onClick={ () => history.push('/profile') }>
        <img src={ profileIcon } alt="userImage" data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">{title}</h1>
      { !(withoutSearch.includes(location))
      && (
        <button type="button">
          <img src={ searchIcon } alt="pesquisar" data-testid="search-top-btn" />
        </button>
      )}

    </header>
  );
}

export default Header;
