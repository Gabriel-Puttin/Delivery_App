import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLink() {
  return (
    <nav>
      <Link
        data-testid="customer_products__element-navbar-link-orders"
        to="/orders "
      >
        GERENCIAR USUÁRIOS
      </Link>
      <br />
      <Link
        to="/user "
        data-testid="customer_products__element-navbar-user-full-name"
      >
        User
      </Link>
      <br />
      <Link
        to="/login "
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </Link>
    </nav>
  );
}
