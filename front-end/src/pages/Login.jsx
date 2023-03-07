import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <form onSubmit={ onLoginSubmit }>
        <input
          data-testid="common_login__input-email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={ handleChange }
          value={ loginForm.email }
        />
        <input
          data-testid="common_login__input-password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={ handleChange }
          value={ loginForm.password }
        />
        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ isDisabled() }
        >
          LOGIN
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
      {
        failedLogin && (
          <span
            data-testid="common_login__element-invalid-email"
          >
            Mensagem de erro
          </span>
        )
      }
    </section>
  );
}
