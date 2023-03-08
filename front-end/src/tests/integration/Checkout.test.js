import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './helpers/renderWithRouter';
import api from '../../services/requests';
import { getSellersResponse } from './mocks/users.mock';
import { cart } from './mocks/cart.mock';
import { getOrderDetailsResponse } from './mocks/sales.mock';

const checkoutRoute = '/customer/checkout';
const detailsRoute = '/customer/orders/1';

describe('testando página Checkout', () => {
  beforeEach(() => {
    global.localStorage.setItem('carrinho', JSON.stringify(cart));
    api.post = jest.fn().mockResolvedValue({ data: { id: 1 } });
    api.get = jest.fn()
      .mockResolvedValueOnce({ data: getSellersResponse })
      .mockResolvedValueOnce({ data: getOrderDetailsResponse });
    cleanup();
  });

  it('Testa se é possivel finalizar compra corretamente', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [checkoutRoute] });

    const itemRemoveBtns = screen.getAllByRole('button', {
      name: /Remover/i,
    });

    const buttonSubmit = screen.getByRole('button', {
      name: /FINALIZAR/i,
    });

    userEvent.click(itemRemoveBtns[1]);
    userEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(api.get).toHaveBeenCalled();
    });

    expect(history.location.pathname).toBe(detailsRoute);
  });
});
