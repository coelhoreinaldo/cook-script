import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginProvider';

function Login() {
  const { email, password, setEmail, setPassword, disabled } = useContext(LoginContext);
  return (
    <div>
      <section>
        <input
          type="email"
          name="email"
          value={ email }
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
        >
          { disabled ? 'Entrar' : <Link to="/meals">Entrar</Link>}
        </button>
      </section>
    </div>
  );
}

export default Login;
