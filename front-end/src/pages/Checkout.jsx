import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const testId = 'customer_checkout__element-order-table-item-number-';

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('carrinho'));
    setProducts(cartItems.filter((product) => product.quantity > 0));
  }, []);

  useEffect(() => {
    const total = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total);
  }, [products]);

  // const deleteItem = (index) => {
  //   const { products } = this.state;

  //   products.splice(index, 1);
  //   this.setState(() => ({
  //     products,
  //   }), () => {
  //     localStorage.setItem('cart', JSON.stringify(products));
  //   });
  // };

  return (
    <section>
      <NavBar />
      <h2>Finalizar Pedido</h2>
      {
        products.map((product, index) => (
          <div key={ index }>
            <p
              data-testid={ `${testId}${index}` }
            >
              {index + 1}
            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
            >
              {product.name}
            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              {product.quantity}
            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
            >
              {`${product.price.replace('.', ',')}`}
            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
            >
              {(product.quantity * product.price).toFixed(2).toString().replace('.', ',')}
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
        data-testid="customer_checkout__element-order-total-price"
      >
        { totalPrice.toFixed(2).toString().replace('.', ',') }
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
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
      >
        FINALIZAR PEDIDO
      </button>
    </section>
  );
}
