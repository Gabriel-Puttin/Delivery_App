import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../services/requests';

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setUser(userInfo);
    setToken(userInfo.token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const onOrdersBtnClick = () => {
    const { role } = user;
    if (role === 'seller') navigate('/seller/orders');
    if (role === 'customer') navigate('/customer/orders');
  };

  return (
    <section>
      {user && (
        <nav>
          {user.role === 'customer' && (
            <button
              type="button"
              data-testid="customer_products__element-navbar-link-products"
              onClick={ () => navigate('/customer/products') }
            >
              PRODUTOS
            </button>
          )}
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ onOrdersBtnClick }
          >
            {user.role === 'customer' ? 'MEUS PEDIDOS' : 'PEDIDOS'}
          </button>
          <h3 data-testid="customer_products__element-navbar-user-full-name">
            {user.name}
          </h3>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ handleLogout }
          >
            SAIR
          </button>
        </nav>

      )}
    </section>
  );
}

export default NavBar;
