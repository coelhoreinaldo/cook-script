import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { SearchBarContext } from '../context/SearchBarProvider';
import SearchBar from './SearchBar';
import panelaImg from '../images/panelaImg.png';
import '../style/Header.css';

const withoutSearch = ['profile', 'done-recipes', 'favorite-recipes'];

const pageHeaderTitle = (location) => {
  if (location === '/meals') {
    return 'Meals';
  } if (location === '/drinks') {
    return 'Drinks';
  }
  if (location === '/profile') {
    return 'Profile';
  }
  if (location === '/done-recipes') {
    return 'Done Recipes';
  }
  if (location === '/favorite-recipes') {
    return 'Favorite Recipes';
  }
};

function Header() {
  const { searchBarVisible, changeVisibility } = useContext(SearchBarContext);
  const history = useHistory();
  const location = history.location.pathname;
  // .split('').filter((_e, index) => index !== 0).join('');
  // const title = location.includes('-')
  // ? location.split('-').join(' ').replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase())
  // : location[0].toUpperCase() + location.substring(1);
  const title = pageHeaderTitle(location);
  return (
    <header>
      <div className="header-top">
        <button type="button" onClick={ () => history.push('/profile') }>
          <img src={ profileIcon } alt="userImage" data-testid="profile-top-btn" />
        </button>
        <div className="header-logo">
          <img src={ panelaImg } alt="recipes app" />
          <h1>Cook Script</h1>
        </div>
        { !withoutSearch.includes(location.split('/')[1])
          && (
            <button type="button" onClick={ changeVisibility }>
              <img src={ searchIcon } alt="pesquisar" data-testid="search-top-btn" />
            </button>
          )}
      </div>
      <div className="header-bottom">
        <h1 data-testid="page-title">{title}</h1>
        {searchBarVisible && <SearchBar />}
      </div>
    </header>
  );
}

export default Header;
