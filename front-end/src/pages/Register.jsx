import React from 'react';

export default function Register() {
  return (
    <section>
      <form>
        <input
          data-testid="common_register__input-name"
          type="text"
          placeholder="Nome"
          name="name"
        />
        <input
          data-testid="common_register__input-email"
          type="email"
          placeholder="Email"
          name="email"
        />
        <input
          data-testid="common_register__input-password"
          type="password"
          placeholder="Password"
          name="password"
        />
        <button
          data-testid="common_register__button-register"
          type="submit"
        >
          CADASTRAR
        </button>
      </form>

      <span
        data-testid="common_register__element-invalid-register"
      >
        Mensagem de erro
      </span>

    </section>
  );
}
