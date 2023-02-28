import React from 'react';

function NavBar() {
  return (
    <nav>
      <h3 data-testid="customer_products__element-navbar-link-products">PRODUTOS</h3>
      <h3 data-testid="customer_products__element-navbar-link-orders">MEUS PEDIDOS</h3>
      <h3 data-testid="customer_products__element-navbar-user-full-name">
        CICRANO DA SILVA
      </h3>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
      >
        SAIR
      </button>
    </nav>
  );
}

export default NavBar;
