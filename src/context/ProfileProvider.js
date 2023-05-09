import React, { useState, useEffect, useMemo, createContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export const ProfileContext = createContext();

function ProfileProvider({ children }) {
  const history = useHistory();
  const [getEmail, setGetEmail] = useState('');

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user'));
    setGetEmail(email);
  }, []);

  const submitButton = useCallback((retorno) => {
    if (retorno === 'done') {
      history.push('/done-recipes');
    }
    if (retorno === 'favorite') {
      history.push('/favorite-recipes');
    }
    if (retorno === 'logout') {
      localStorage.clear();
      history.push('/');
    }
  }, [history]);

  const valor = useMemo(() => ({
    getEmail,
    submitButton,
  }), [getEmail, submitButton]);
  return (
    <ProfileContext.Provider value={ valor }>
      <div>
        { children }
      </div>
    </ProfileContext.Provider>
  );
}

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfileProvider;
