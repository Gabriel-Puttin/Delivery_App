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
    <section
      className="mb-2"
      style={ { width: '1200px' } }
    >
      <h2 className="ms-2">
        Detalhes e Endereço para Entrega
      </h2>
      <form
        onSubmit={ onFinishOrderSubmit }
        className="cards_products d-flex flex-wrap justify-content-evenly"
      >
        <label
          htmlFor="seller"
          className="form-label"
        >
          P. Vendedora Responsável:
          <select
            className="form-select"
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
        <label
          style={ { width: '600px' } }
          htmlFor="address"
          className="form-label"
        >
          Endereço
          <input
            className="form-control"
            name="deliveryAddress"
            type="text"
            id="address"
            data-testid="customer_checkout__input-address"
            value={ checkoutForm.deliveryAddress }
            onChange={ handleChange }
          />
        </label>
        <label
          htmlFor="number"
          className="form-label"
        >
          Número
          <input
            className="form-control"
            type="number"
            name="deliveryNumber"
            id="number"
            data-testid="customer_checkout__input-address-number"
            value={ checkoutForm.deliveryNumber }
            onChange={ handleChange }
          />
        </label>
        <button
          className="btn td-primary my-3"
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
