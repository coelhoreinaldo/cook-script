import { useContext } from 'react';
import { LoginContext } from '../context/LoginProvider';

function Login() {
  const { emailInput, password, setEmail, setPassword,
    disabled, submitButton } = useContext(LoginContext);
  return (
    <div>
      <section>
        <input
          type="email"
          name="email"
          value={ emailInput }
          id="email"
          placeholder="E-mail"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          value={ password }
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          disabled={ disabled }
          type="button"
          data-testid="login-submit-btn"
          id="buttonLogin"
          onClick={ () => submitButton() }
        >
          Entrar
        </button>
      </section>
    </div>
  );
}

export default Login;
