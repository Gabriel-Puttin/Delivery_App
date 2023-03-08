import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DeliveryAppContext from '../context/DeliveryAppContext';
import { requestPost } from '../services/requests';

export default function Register() {
  const { login } = useContext(DeliveryAppContext);

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [failedRegister, setFailedRegister] = useState(false);

  const navigate = useNavigate();

  const isDisabled = () => {
    const { name, email, password } = registerForm;
    const validateEmail = /\S+@\S+\.\S+/;
    const minNameLength = 12;
    const minPasswordLength = 6;
    return !(name.length >= minNameLength
       && password.length >= minPasswordLength
       && validateEmail.test(email));
  };

  const handleChange = (event) => {
    const { target } = event;
    setRegisterForm({ ...registerForm, [target.name]: target.value });
  };

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await requestPost('/users/register', registerForm);
      login(user);
      navigate('/customer/products');
    } catch (error) {
      setFailedRegister(true);
    }
  };

  return (
    <section className="section">
      <h2 id="title_registry">Cadastro</h2>
      <Form
        id="form_registry"
        onSubmit={ onRegisterSubmit }
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="input-name">Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="input-name"
            data-testid="common_register__input-name"
            placeholder="Seu nome"
            value={ registerForm.name }
            onChange={ handleChange }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="input-email">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="input-email"
            data-testid="common_register__input-email"
            placeholder="seu-email@site.com"
            value={ registerForm.email }
            onChange={ handleChange }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label htmlFor="input-email">Senha</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="input-password"
            data-testid="common_register__input-password"
            placeholder="********"
            value={ registerForm.password }
            onChange={ handleChange }
          />
        </Form.Group>
        <Button
          id="btn_registry"
          bsPrefix
          data-testid="common_register__button-register"
          type="submit"
          disabled={ isDisabled() }
        >
          CADASTRAR
        </Button>
      </Form>
      {
        failedRegister && (
          <span
            data-testid="common_register__element-invalid_register"
          >
            E-mail já cadastrado
          </span>
        )
      }
    </section>
  );
}

{ /* <form onSubmit={ onRegisterSubmit }>
        <label htmlFor="input-name">
          Nome
          <input
            type="text"
            name="name"
            id="input-name"
            data-testid="common_register__input-name"
            placeholder="Seu nome"
            value={ registerForm.name }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            type="email"
            name="email"
            id="input-email"
            data-testid="common_register__input-email"
            placeholder="seu-email@site.com"
            value={ registerForm.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="input-password">
          Senha
          <input
            type="password"
            name="password"
            id="input-password"
            data-testid="common_register__input-password"
            placeholder="********"
            value={ registerForm.password }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="submit"
          disabled={ isDisabled() }
        >
          CADASTRAR
        </button>
      </form> */ }
