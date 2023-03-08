import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './helpers/renderWithRouter';
import { validUserForm } from './mocks/users.mock';
import api from '../../services/requests';
import { getProductsResponse } from './mocks/products.mock';

const registerRoute = '/register';
const productsRoute = '/customer/products';

describe('testando página Register', () => {
  beforeEach(() => {
    global.localStorage.clear();
    cleanup();
  });

  it('Testa se os componente de Register são renderizados', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [registerRoute] });

    const formName = await screen.findByLabelText(/Nome/i);
    const formEmail = await screen.findByLabelText(/Email/i);
    const formPassword = await screen.findByLabelText(/Senha/i);
    const formSendBtn = await screen.findByRole('button', {
      name: /CADASTRAR/i,
    });

    expect(history.location.pathname).toBe(registerRoute);

    expect(formName).toBeInTheDocument();
    expect(formEmail).toBeInTheDocument();
    expect(formPassword).toBeInTheDocument();
    expect(formSendBtn).toBeInTheDocument();
  });

  it('Testa se é possível cadastrar um usuário', async () => {
    api.post = jest.fn().mockResolvedValue({ data: { status: 201 } });
    api.get = jest.fn().mockResolvedValue({ data: getProductsResponse });

    const { history } = renderWithRouter(<App />, { initialEntries: [registerRoute] });

    const formName = await screen.findByLabelText(/Nome/i);
    const formEmail = await screen.findByLabelText(/Email/i);
    const formPassword = await screen.findByLabelText(/Senha/i);
    const formSubmitBtn = await screen.findByRole('button', {
      name: /CADASTRAR/i,
    });

    expect(formSubmitBtn).toBeDisabled();

    userEvent.type(formName, validUserForm.name);
    userEvent.type(formEmail, validUserForm.email);
    userEvent.type(formPassword, validUserForm.password);

    expect(formSubmitBtn).toBeEnabled();

    userEvent.click(formSubmitBtn);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(api.get).toHaveBeenCalled();
      expect(history.location.pathname).toBe(productsRoute);
    });
  });

  it('Testa se mostra mensagem de erro se usuário já existe', async () => {
    api.post = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    renderWithRouter(<App />, { initialEntries: [registerRoute] });

    const formName = await screen.findByLabelText(/Nome/i);
    const formEmail = await screen.findByLabelText(/Email/i);
    const formPassword = await screen.findByLabelText(/Senha/i);
    const formSubmitBtn = await screen.findByRole('button', {
      name: /CADASTRAR/i,
    });

    userEvent.type(formName, validUserForm.name);
    userEvent.type(formEmail, validUserForm.email);
    userEvent.type(formPassword, validUserForm.password);
    userEvent.click(formSubmitBtn);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
    });

    const errorMessage = await screen.findByText(/E-mail já cadastrado/i);
    expect(errorMessage).toBeEnabled();
  });
});
