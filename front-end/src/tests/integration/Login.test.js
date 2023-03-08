import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

import renderWithRouter from './helpers/renderWithRouter';

import {
  validLogin, invalidLogin,
  customer, seller, admin,
} from './mocks/login.mock';
import { getUsersResponse } from './mocks/users.mock';
import { getSalesResponse } from './mocks/sales.mock';
import { getProductsResponse } from './mocks/products.mock';
import api from '../../services/requests';

describe('testando página Login', () => {
  beforeEach(() => {
    global.localStorage.clear();
    cleanup();
  });

  it('Testa se os componente de Login são renderizados', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/login');

    const inputEmail = screen.getByPlaceholderText(/seu-email@/i);
    const inputPassword = screen.getByPlaceholderText(/[*]{8}/i);
    const buttonSubmit = screen.getByRole('button', {
      name: /LOGIN/i,
      value: false,
    });
    const buttonRegister = screen.getByRole('button', {
      name: /Ainda/i,
      value: false,
    });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonRegister).toBeInTheDocument();
  });

  it('Testa se é possível fazer login', async () => {
    api.post = jest.fn().mockResolvedValue({ data: customer });
    api.get = jest.fn().mockResolvedValue({ data: getProductsResponse });

    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/login');

    const inputEmail = screen.getByPlaceholderText(/seu-email@/i);
    const inputPassword = screen.getByPlaceholderText(/[*]{8}/i);
    const buttonSubmit = screen.getByRole('button', {
      name: /LOGIN/i,
      value: false,
    });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonSubmit).toBeDisabled();

    userEvent.type(inputEmail, validLogin.email);

    expect(buttonSubmit).toBeDisabled();

    userEvent.type(inputPassword, validLogin.password);

    expect(buttonSubmit).toBeEnabled();

    userEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(api.get).toHaveBeenCalled();
    });

    expect(history.location.pathname).toBe('/customer/products');
  });
  it('Testa se mostra mensagem de erro com dados inválidos', async () => {
    api.post = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/seu-email@/i);
    const inputPassword = screen.getByPlaceholderText(/[*]{8}/i);
    const buttonSubmit = screen.getByRole('button', {
      name: /LOGIN/i,
      value: false,
    });

    userEvent.type(inputEmail, invalidLogin.email);

    expect(buttonSubmit).toBeDisabled();

    userEvent.type(inputPassword, invalidLogin.password);

    expect(buttonSubmit).toBeEnabled();

    userEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
    });

    const errorMessage = await screen.findByText(/Usuário inválido/i);
    expect(errorMessage).toBeEnabled();
    expect(history.location.pathname).toBe('/login');
  });

  it('Testa se o botão de registro funciona', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/login');

    const buttonRegister = screen.getByRole('button', {
      name: /Ainda/i,
      value: false,
    });

    userEvent.click(buttonRegister);

    expect(history.location.pathname).toBe('/register');
  });
  it('Testa se é redirecionado corretamente como admin', async () => {
    global.localStorage.setItem('user', JSON.stringify(admin));

    api.get = jest.fn().mockResolvedValue({ data: getUsersResponse });

    const { history } = renderWithRouter(<App />);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/admin/manage');
    });
  });
  it('Testa se é redirecionado corretamente como seller', async () => {
    global.localStorage.setItem('user', JSON.stringify(seller));

    api.get = jest.fn().mockResolvedValue({ data: getSalesResponse });

    const { history } = renderWithRouter(<App />);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/seller/orders');
    });
  });
  it('Testa se é redirecionado corretamente como customer', async () => {
    global.localStorage.setItem('user', JSON.stringify(customer));

    api.get = jest.fn().mockResolvedValue({ data: getProductsResponse });

    const { history } = renderWithRouter(<App />);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/products');
    });
  });
});
