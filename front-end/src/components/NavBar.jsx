import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setUser(userInfo);
  }, []);

  const handleClick = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav>
      <h3 data-testid="customer_products__element-navbar-link-products">PRODUTOS</h3>
      <h3 data-testid="customer_products__element-navbar-link-orders">MEUS PEDIDOS</h3>
      <h3 data-testid="customer_products__element-navbar-user-full-name">
        {user.name}
      </h3>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ handleClick }
      >
        SAIR
      </button>
    </nav>
  );
}

export default NavBar;
