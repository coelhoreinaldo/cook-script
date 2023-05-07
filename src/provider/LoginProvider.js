import React, { useState, useEffect, useMemo, createContext } from 'react';
import PropTypes from 'prop-types';

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setIsValid] = useState(true);
  console.log(password);
  useEffect(() => {
    const min = 6;
    setIsValid(!(email.match(/\S+@\S+\.\S+/) && password.length > min));
  }, [email, password]);

  const valor = useMemo(() => ({
    email,
    disabled,
    password,
    setEmail,
    setPassword,
  }), [email, disabled, password, setEmail, setPassword]);
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
