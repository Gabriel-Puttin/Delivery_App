import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './helpers/renderWithRouter';
import api from '../../services/requests';
import { getSellersResponse } from './mocks/users.mock';
import { cart } from './mocks/cart.mock';
import { getOrderDetailsResponse } from './mocks/sales.mock';
import { customer } from './mocks/login.mock';
import { getProductsResponse } from './mocks/products.mock';

const checkoutRoute = '/customer/checkout';
const productsRoute = '/customer/products';
const detailsRoute = '/customer/orders/1';

describe('testando página Checkout', () => {
  beforeEach(() => {
    global.localStorage.setItem('carrinho', JSON.stringify(cart));
    global.localStorage.setItem('user', JSON.stringify(customer));
    cleanup();
  });

  it('Testa se é possivel finalizar compra corretamente', async () => {
    api.post = jest.fn().mockResolvedValue({ data: { id: 1 } });
    api.get = jest.fn()
      .mockResolvedValueOnce({ data: getSellersResponse })
      .mockResolvedValueOnce({ data: getOrderDetailsResponse });

    const { history } = renderWithRouter(<App />, { initialEntries: [checkoutRoute] });

    const addressInput = await screen.findByLabelText(/Endereço/i);
    const addressNumberInput = await screen.findByLabelText(/Número/i);

    const itemRemoveBtns = screen.getAllByRole('button', {
      name: /Remover/i,
    });

    const buttonSubmit = screen.getByRole('button', {
      name: /FINALIZAR/i,
    });

    userEvent.type(addressInput, 'Rua da Goiaba');
    userEvent.type(addressNumberInput, '123');
    userEvent.click(itemRemoveBtns[1]);
    userEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(api.get).toHaveBeenCalled();
    });

    expect(history.location.pathname).toBe(detailsRoute);
  });

  it('Testa se o menu de navegação funciona corretamente', async () => {
    api.get = jest.fn()
      .mockResolvedValueOnce({ data: getSellersResponse })
      .mockResolvedValueOnce({ data: getProductsResponse });

    const { history } = renderWithRouter(<App />, { initialEntries: [checkoutRoute] });

    const productsBtn = await screen.findByRole('button', {
      name: /PRODUTOS/i,
    });

    userEvent.click(productsBtn);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalled();
    });

    expect(history.location.pathname).toBe(productsRoute);
  });
});
