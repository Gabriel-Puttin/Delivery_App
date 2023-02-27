import React from 'react';

export default function Login() {
  return (
    <section>
      <form>
        <input
          data-testid="common_login__input-email"
          type="email"
          placeholder="Email"
          name="email"
        />
        <input
          data-testid="common_login__input-password"
          type="password"
          placeholder="Password"
          name="password"
        />
        <button
          data-testid="common_login__button-login"
          type="submit"
        >
          LOGIN
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
        >
          Ainda não tenho conta
        </button>
      </form>
      <span data-testid="common_login__element-invalid-email">Mensagem de error</span>
    </section>
  );
}
