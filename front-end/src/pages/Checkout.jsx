import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { requestData, requestPost } from '../services/requests';

export default function Checkout() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({
    sellerId: 0,
    deliveryAddress: '',
    deliveryNumber: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const testId = 'customer_checkout__element-order-table-item-number-';

  useEffect(() => {
    const fetchSellers = async () => {
      const sellersList = await requestData('/users/sellers');
      setSellers(sellersList);
    };
    const cartItems = JSON.parse(localStorage.getItem('carrinho'));
    setProducts(cartItems.filter((product) => product.quantity > 0));
    fetchSellers();
  }, []);

  useEffect(() => {
    const total = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total);
  }, [products]);

  useEffect(() => {
    if (sellers.length > 0) {
      setCheckoutForm((form) => ({
        ...form,
        sellerId: sellers[0].id,
      }));
    }
  }, [sellers]);

  const onRemoveItemBtnClick = (indexToRemove) => {
    const updatedCart = products.filter((_product, index) => index !== indexToRemove);
    setProducts(updatedCart);
  };

  const handleChange = (event) => {
    const { target } = event;
    setCheckoutForm({ ...checkoutForm, [target.name]: target.value });
  };

  const onFinishOrderBtnClick = async () => {
    const orderInfo = { ...checkoutForm, totalPrice };
    const order = { orderInfo, products };
    console.log(order);
    const { id } = await requestPost('/sales', order);
    navigate(`/customer/orders/${id}`);
  };

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
              onClick={ () => onRemoveItemBtnClick(index) }
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
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            name="sellerId"
            id="seller"
            data-testid="customer_checkout__select-seller"
            onChange={ handleChange }
            value={ checkoutForm.sellerId }
          >
            {
              sellers.map((seller, index) => (
                <option
                  key={ `seller-${index}` }
                  value={ seller.id }
                >
                  {seller.name}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="address">
          Endereço
          <input
            type="text"
            name="deliveryAddress"
            id="address"
            data-testid="customer_checkout__input-address"
            onChange={ handleChange }
            value={ checkoutForm.deliveryAddress }
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            type="number"
            name="deliveryNumber"
            id="number"
            data-testid="customer_checkout__input-address-number"
            onChange={ handleChange }
            value={ checkoutForm.deliveryNumber }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ onFinishOrderBtnClick }
      >
        FINALIZAR PEDIDO
      </button>
    </section>
  );
}
