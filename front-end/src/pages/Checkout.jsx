import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [products, setProducts] = useState('');

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    setProducts(cartItems);
  }, []);

  const deleteItem = (index) => {
    const { products } = this.state;

    products.splice(index, 1);
    this.setState(() => ({
      products,
    }), () => {
      localStorage.setItem('cart', JSON.stringify(products));
    });
  }

  return (
    <section>
      <h2>Finalizar Pedido</h2>
        { 
          products.map((product, index) => (
            <div key={index}>
              <p
                data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
              >
                {index}
              </p>
              <p
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {product}
              </p>
              <p
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                {product.quantity}
              </p>
              <p
                data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
              >
                {`R$${product.price}`}
              </p>
              <p
                data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
              >
                {product.quantity * product.price}
              </p>
              <button
                type="button"
                onClick={ () => deleteItem(index) }
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              >
                Remover
              </button>
            </div>
          ))
        }
      <p 
        data-testid= {customer_checkout__element-order-total-price}
      >
        { `Total: R$${?}` }
      </p>
      <h2>Detalhes e Endereço para Entrega</h2>
      <div>
        <label htmlFor="name">
          P. Vendedora Responsável:
          <select
            name="name"
            id="name"
            data-testid="customer_checkout__select-seller"
          >
            <option value="Fulana">Fulana Pereira</option>
          </select>
        </label>
        <label htmlFor="address">
          Endereço
          <input
            type="text"
            name="address"
            id="address"
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            type="number"
            name="number"
            id="number"
            data-testid="customer_checkout__input-address-number"
          />
        </label>
      </div>
      <Link to="/compra-realizada">
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO
        </button>
      </Link>
    </section>
  );
}
