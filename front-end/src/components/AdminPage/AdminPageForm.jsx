import React, { useContext, useState } from 'react';
import DeliveryAppContext from '../../context/DeliveryAppContext';
import { requestPost } from '../../services/requests';

export default function AdminPageForm() {
  const { fetchUserList } = useContext(DeliveryAppContext);

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });

  const [failedRegister, setFailedRegister] = useState(false);

  const handleChange = (event) => {
    const { target } = event;
    setUserForm({ ...userForm, [target.name]: target.value });
  };

  const isDisabled = () => {
    const { name, email, password } = userForm;
    const validateLenghtName = 11;
    const validateEmail = /\S+@\S+\.\S+/;
    const validatePassword = 6;
    return !(password.length >= validatePassword
      && validateEmail.test(email) && name.length > validateLenghtName);
  };

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      await requestPost('/users/admin/register', userForm);
      return fetchUserList();
    } catch (error) {
      setFailedRegister(true);
    }
  };

  return (
    <section>
      <h2>Cadastrar novo usuário</h2>
      <form onSubmit={ onRegisterSubmit }>
        <label htmlFor="input-name">
          Nome
          <input
            type="text"
            name="name"
            id="input-name"
            data-testid="admin_manage__input-name"
            value={ userForm.name }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            type="email"
            name="email"
            id="input-email"
            data-testid="admin_manage__input-email"
            value={ userForm.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="input-password">
          Senha
          <input
            type="password"
            name="password"
            id="input-password"
            data-testid="admin_manage__input-password"
            value={ userForm.password }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="role-select">
          Tipo
          <select
            name="role"
            id="role-select"
            data-testid="admin_manage__select-role"
            value={ userForm.role }
            onChange={ handleChange }
          >
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ isDisabled() }
        >
          CADASTRAR
        </button>
      </form>
      {
        failedRegister && (
          <span
            data-testid="admin_manage__element-invalid-register"
          >
            Mensagem de erro
          </span>
        )
      }
    </section>
  );
}
