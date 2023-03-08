import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './helpers/renderWithRouter';
import api from '../../services/requests';
import { getSalesResponse, getOrderDetailsResponse } from './mocks/sales.mock';
import { customer, seller } from './mocks/login.mock';

const sellerOrdersRoute = '/seller/orders';
const sellerDetailsRoute = '/seller/orders/1';
const customerDetailsRoute = '/customer/orders/1';

describe('testando páginas Orders', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Testa se é possivel alterar status do pedido como seller', async () => {
    global.localStorage.setItem('user', JSON.stringify(seller));
    api.patch = jest.fn().mockResolvedValue({ data: {} });
    api.get = jest.fn()
      .mockResolvedValueOnce({ data: getOrderDetailsResponse })
      .mockResolvedValueOnce({ data: {
        ...getOrderDetailsResponse, status: 'Preparando',
      } })
      .mockResolvedValueOnce({ data: {
        ...getOrderDetailsResponse, status: 'Em Trânsito',
      } });

    const { history } = renderWithRouter(<App />, {
      initialEntries: [sellerDetailsRoute],
    });

    const preparingBtn = await screen.findByRole('button', {
      name: /PREPARAR/i,
    });

    const dispatchBtn = await screen.findByRole('button', {
      name: /SAIU/i,
    });

    expect(history.location.pathname).toBe(sellerDetailsRoute);

    expect(dispatchBtn).toBeDisabled();

    userEvent.click(preparingBtn);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalled();
    });

    expect(preparingBtn).toBeDisabled();
    expect(dispatchBtn).toBeEnabled();

    userEvent.click(dispatchBtn);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalled();
    });

    expect(preparingBtn).toBeDisabled();
    expect(dispatchBtn).toBeDisabled();
  });

  it('Testa se é possivel alterar status do pedido como customer', async () => {
    global.localStorage.setItem('user', JSON.stringify(customer));
    api.patch = jest.fn().mockResolvedValue({ data: {} });
    api.get = jest.fn()
      .mockResolvedValueOnce({ data: {
        ...getOrderDetailsResponse, status: 'Em Trânsito',
      } })
      .mockResolvedValueOnce({ data: {
        ...getOrderDetailsResponse, status: 'Entregue',
      } });

    const { history } = renderWithRouter(<App />, {
      initialEntries: [customerDetailsRoute],
    });

    const checkDeliveryBtn = await screen.findByRole('button', {
      name: /Marcar/i,
    });

    expect(history.location.pathname).toBe(customerDetailsRoute);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalled();
    });

    expect(checkDeliveryBtn).toBeEnabled();

    userEvent.click(checkDeliveryBtn);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalled();
    });

    expect(checkDeliveryBtn).toBeDisabled();
  });

  it('Testa se o menu de navegação funciona corretamente', async () => {
    global.localStorage.setItem('user', JSON.stringify(seller));
    api.get = jest.fn()
      .mockResolvedValueOnce({ data: getOrderDetailsResponse })
      .mockResolvedValueOnce({ data: getSalesResponse });

    const { history } = renderWithRouter(<App />, {
      initialEntries: [sellerDetailsRoute] });

    const ordersBtn = await screen.findByRole('button', {
      name: /PEDIDOS/i,
    });

    userEvent.click(ordersBtn);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalled();
    });

    expect(history.location.pathname).toBe(sellerOrdersRoute);
  });
});
