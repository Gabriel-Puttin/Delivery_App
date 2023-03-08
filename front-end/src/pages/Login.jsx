import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DeliveryAppContext from '../context/DeliveryAppContext';
import { requestPost } from '../services/requests';

export default function Login() {
  const { user, login } = useContext(DeliveryAppContext);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [failedLogin, setFailedLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const { role } = user;
    if (role === 'administrator') navigate('/admin/manage');
    if (role === 'seller') navigate('/seller/orders');
    if (role === 'customer') navigate('/customer/products');
  }, [user, navigate]);

  const isDisabled = () => {
    const { email, password } = loginForm;
    const validateEmail = /\S+@\S+\.\S+/;
    const validatePassword = 6;
    return !(password.length >= validatePassword && validateEmail.test(email));
  };

  const handleChange = (event) => {
    const { target } = event;
    setLoginForm({ ...loginForm, [target.name]: target.value });
  };

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const userInfo = await requestPost('/login', loginForm);
      login(userInfo);
    } catch (error) {
      setFailedLogin(true);
    }
  };

  return (
    <section>
      <Form id="form-login" onSubmit={ onLoginSubmit }>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label
            className="label_form_login"
            htmlFor="input-email"
          >
            Email address

          </Form.Label>
          <Form.Control
            className="input_form_login"
            type="email"
            name="email"
            id="input-email"
            data-testid="common_login__input-email"
            placeholder="seu-email@site.com"
            value={ loginForm.email }
            onChange={ handleChange }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label
            className="label_form_login"
            htmlFor="input-password"
          >
            Password

          </Form.Label>
          <Form.Control
            className="input_form_login"
            type="password"
            name="password"
            id="input-password"
            data-testid="common_login__input-password"
            placeholder="********"
            value={ loginForm.password }
            onChange={ handleChange }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button
            id="btn-login"
            tid="btn-login"
            bsPrefix
            data-testid="common_login__button-login"
            type="submit"
            disabled={ isDisabled() }
          >
            LOGIN
          </Button>
          <Button
            id="btn-outline-green"
            data-testid="common_login__button-register"
            type="button"
            onClick={ () => navigate('/register') }
          >
            Ainda não tenho conta
          </Button>
        </Form.Group>
        {
          failedLogin && (
            <span
              id="spam_text"
              data-testid="common_login__element-invalid-email"
            >
              Usuário inválido
            </span>
          )
        }
      </Form>
    </section>
  );
}
