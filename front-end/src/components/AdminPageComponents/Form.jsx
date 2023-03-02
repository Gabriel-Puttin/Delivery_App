import React, { useState } from 'react';

export default function Form() {
  const [users, setUsers] = useState({
    item: '',
    nome: '',
    email: '',
    password: '',
    excluir: '',
    isDisable: true,
  });

  const [tipo, setTipo] = useState(['Vendedor', 'Cliente']);
  const handleChange = (event) => {
    const { target } = event;
    setUsers({ ...users, [target.name]: target.value });
  };

  return (
    <form action="">
      <label htmlFor="name">
        nome
        <input
          value={ users.nome }
          data-testid="admin_manage__input-name"
          name="nome"
          type="text"
          onChange={ handleChange }
        />
      </label>
      Email
      <label htmlFor="email">
        <input
          value={ users.email }
          name="email"
          data-testid="admin_manage__input-email"
          type="email"
          onChange={ handleChange }
        />
      </label>
      Senha
      <label htmlFor="password">
        <input
          value={ users.password }
          name="password"
          data-testid="admin_manage__input-password"
          type="password"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="select">
        Tipo
        <select
          value={ tipo }
          name="tipo"
          onChange={ (e) => {
            const options = [...e.target.selectedOptions];
            const values = options.map((option) => option.value);
            setTipo(values);
          } }
          data-testid="admin_manage__select-role"
        >
          <option value="Cliente">Cliente</option>
          <option value="Vendedor">Vendedor</option>
        </select>
      </label>
      <button
        data-testid="admin_manage__button-register"
        type="submit"
      >
        CADASTRAR

      </button>
    </form>
  );
}
