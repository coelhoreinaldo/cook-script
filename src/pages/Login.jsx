import React from 'react';

function Login() {
  return (
    <div>

      <section>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          data-testid="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          id="buttonLogin"
        >
          Entrar

        </button>
      </section>
    </div>
  );
}

export default Login;
