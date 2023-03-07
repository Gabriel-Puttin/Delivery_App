import React, { useEffect, useState } from 'react';
import { requestData } from '../../services/requests';

export default function CheckoutForm({ finishOrder }) {
  const [sellers, setSellers] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({
    sellerId: 0,
    deliveryAddress: '',
    deliveryNumber: '',
  });

  useEffect(() => {
    const fetchSellers = async () => {
      const sellersList = await requestData('/users/sellers');
      setSellers(sellersList);
      setCheckoutForm((form) => ({
        ...form,
        sellerId: sellersList[0].id,
      }));
    };
    fetchSellers();
  }, []);

  const handleChange = (event) => {
    const { target } = event;
    setCheckoutForm({ ...checkoutForm, [target.name]: target.value });
  };

  const onFinishOrderSubmit = async (event) => {
    event.preventDefault();
    return finishOrder(checkoutForm);
  };

  return (
    <section>
      <form onSubmit={ onFinishOrderSubmit }>
        <h2>Detalhes e Endereço para Entrega</h2>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            name="sellerId"
            id="seller"
            data-testid="customer_checkout__select-seller"
            value={ checkoutForm.sellerId }
            onChange={ handleChange }
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
            name="deliveryAddress"
            type="text"
            id="address"
            data-testid="customer_checkout__input-address"
            value={ checkoutForm.deliveryAddress }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            type="number"
            name="deliveryNumber"
            id="number"
            data-testid="customer_checkout__input-address-number"
            value={ checkoutForm.deliveryNumber }
            onChange={ handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </section>
  );
}

CheckoutForm.propTypes = {
}.isRequired;
