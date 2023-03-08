import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './helpers/renderWithRouter';
import api from '../../services/requests';
import { getProductsResponse } from './mocks/products.mock';
import { getSellersResponse } from './mocks/users.mock';
import { getSalesResponse } from './mocks/sales.mock';
import { customer } from './mocks/login.mock';

const productsRoute = '/customer/products';
const checkoutRoute = '/customer/checkout';
const ordersRoute = '/customer/orders';

const cartBtnTestId = 'customer_products__button-cart';

describe('testando página Products', () => {
  beforeEach(() => {
    global.localStorage.setItem('user', JSON.stringify(customer));
    cleanup();
  });

  it('Testa se adição e remoção de produtos funciona corretamente', async () => {
    api.get = jest.fn().mockResolvedValue({ data: getProductsResponse });

    const { history } = renderWithRouter(<App />, { initialEntries: [productsRoute] });

    const itemRemoveBtns = await screen.findAllByTestId(/button-card-rm-item/i);
    const itemAddBtns = await screen.findAllByTestId(/button-card-add-item/i);
    const itemQtyInputs = await screen.findAllByTestId(/input-card-quantity/i);
    const cartBtn = await screen.findByTestId(cartBtnTestId);
    const cartBtnValue = await screen.findByTestId(/checkout-bottom-value/i);

    expect(history.location.pathname).toBe(productsRoute);

    expect(itemRemoveBtns.length).toBe(getProductsResponse.length);
    expect(itemAddBtns.length).toBe(getProductsResponse.length);
    expect(itemQtyInputs.length).toBe(getProductsResponse.length);

    expect(cartBtn).toBeDisabled();

    expect(cartBtnValue.innerHTML).toBe('0,00');
    userEvent.type(itemQtyInputs[4], '1');
    expect(cartBtnValue.innerHTML).toBe('2,19');

    expect(cartBtn).toBeEnabled();

    userEvent.click(itemAddBtns[4]);
    expect(cartBtnValue.innerHTML).toBe('4,38');

    userEvent.click(itemRemoveBtns[4]);
    userEvent.click(itemRemoveBtns[4]);
    userEvent.click(itemRemoveBtns[4]);
    expect(cartBtnValue.innerHTML).toBe('0,00');
  });

  it('Testa se redirecionamento para checkout funciona corretamente', async () => {
    api.get = jest.fn()
      .mockResolvedValueOnce({ data: getProductsResponse })
      .mockResolvedValueOnce({ data: getSellersResponse });

    const { history } = renderWithRouter(<App />, { initialEntries: [productsRoute] });

    const itemQtyInputs = await screen.findAllByTestId(/input-card-quantity/i);
    const cartBtn = await screen.findByTestId(cartBtnTestId);

    userEvent.type(itemQtyInputs[4], '1');
    userEvent.click(cartBtn);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledTimes(2);
    });

    expect(history.location.pathname).toBe(checkoutRoute);
  });

  it('Testa se o menu de navegação funciona corretamente', async () => {
    api.get = jest.fn()
      .mockResolvedValueOnce({ data: getProductsResponse })
      .mockResolvedValueOnce({ data: getSalesResponse });

    const { history } = renderWithRouter(<App />, { initialEntries: [productsRoute] });

    const ordersBtn = await screen.findByRole('button', {
      name: /MEUS PEDIDOS/i,
    });

    userEvent.click(ordersBtn);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalled();
    });

    expect(history.location.pathname).toBe(ordersRoute);
  });
});
