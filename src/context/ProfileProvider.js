import React, { useState, useEffect, useMemo, createContext, useCallback } from 'react';
import PropTypes from 'prop-types';

export const ProfileContext = createContext();

function ProfileProvider({ children }) {
  const [getEmail, setGetEmail] = useState('');

  useEffect(() => {
    const retorno = JSON.parse(localStorage.getItem('user'));
    setGetEmail(retorno);
  }, []);

  const submitButton = useCallback((retorno) => {
    console.log(retorno);
    if (retorno === 'done') {
      window.location.href = '/done-recipes';
    }
    if (retorno === 'favorite') {
      window.location.href = '/favorite-recipes';
    }
    if (retorno === 'logout') {
      window.location.href = '/';
    }
  }, []);

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
