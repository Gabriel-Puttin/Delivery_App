import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './helpers/renderWithRouter';
import api from '../../services/requests';
import { getSalesResponse, getOrderDetailsResponse } from './mocks/sales.mock';
import { seller } from './mocks/login.mock';

const ordersRoute = '/seller/orders';
const detailsRoute = '/seller/orders/1';

describe('testando páginas Orders', () => {
  beforeEach(() => {
    global.localStorage.setItem('user', JSON.stringify(seller));
    cleanup();
  });

  it('Testa se é possivel clicar em um pedido', async () => {
    api.get = jest.fn()
      .mockResolvedValueOnce({ data: getSalesResponse })
      .mockResolvedValueOnce({ data: getOrderDetailsResponse });

    const { history } = renderWithRouter(<App />, { initialEntries: [ordersRoute] });

    const ordersBtns = await screen.findAllByRole('link');

    expect(history.location.pathname).toBe(ordersRoute);

    expect(ordersBtns.length).toBe(getSalesResponse.length);

    userEvent.click(ordersBtns[0]);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalled();
    });

    expect(history.location.pathname).toBe(detailsRoute);
  });
});
