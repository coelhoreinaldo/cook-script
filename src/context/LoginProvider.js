import React, { useState, useEffect, useMemo, createContext, useCallback } from 'react';
import PropTypes from 'prop-types';

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [emailInput, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setIsValid] = useState(true);

  useEffect(() => {
    const min = 6;
    setIsValid(!(emailInput.match(/\S+@\S+\.\S+/) && password.length > min));
  }, [emailInput, password]);

  const submitButton = useCallback(() => {
    window.location.href = '/meals';
    localStorage.setItem('user', JSON.stringify({ email: emailInput }));
  }, [emailInput]);

  const valor = useMemo(() => ({
    emailInput,
    disabled,
    password,
    setEmail,
    setPassword,
    submitButton,
  }), [emailInput, disabled, password, setEmail, setPassword, submitButton]);
  return (
    <LoginContext.Provider value={ valor }>
      <div>
        { children }
      </div>
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
