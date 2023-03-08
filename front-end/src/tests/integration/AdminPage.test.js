import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './helpers/renderWithRouter';
import { admin } from './mocks/login.mock';
import { getUsersResponse, validUserForm } from './mocks/users.mock';
import api from '../../services/requests';

const adminRoute = '/admin/manage';
const loginRoute = '/login';

describe('testando página Admin', () => {
  beforeEach(() => {
    global.localStorage.setItem('user', JSON.stringify(admin));
    api.get = jest.fn().mockResolvedValue({ data: getUsersResponse });
    cleanup();
  });

  it('Testa se os componente de Admin são renderizados', async () => {
    const { history } = renderWithRouter(<App />);

    const formName = await screen.findByLabelText(/Nome/i);
    const formEmail = await screen.findByLabelText(/Email/i);
    const formPassword = await screen.findByLabelText(/Senha/i);
    const formRole = await screen.findByLabelText(/Tipo/i);
    const formSendBtn = await screen.findByRole('button', {
      name: /CADASTRAR/i,
    });

    expect(history.location.pathname).toBe(adminRoute);

    expect(formName).toBeInTheDocument();
    expect(formEmail).toBeInTheDocument();
    expect(formPassword).toBeInTheDocument();
    expect(formRole).toBeInTheDocument();
    expect(formSendBtn).toBeInTheDocument();
  });

  it('Testa se é possivel remover usuários', async () => {
    api.delete = jest.fn().mockResolvedValue();

    const { history } = renderWithRouter(<App />);

    const removeUserBtns = await screen.findAllByRole('button', {
      name: /Excluir/i,
    });

    expect(removeUserBtns.length).toBe(2);

    userEvent.click(removeUserBtns[0]);

    await waitFor(() => {
      expect(history.location.pathname).toBe(adminRoute);
      expect(api.delete).toHaveBeenCalled();
      expect(api.get).toHaveBeenCalledTimes(2);
    });
  });

  it('Testa se o menu de navegação funciona corretamente', async () => {
    const { history } = renderWithRouter(<App />);

    const navManageBtn = await screen.findByRole('button', {
      name: /Gerenciar/i,
    });
    const navName = await screen.findByText(admin.name);
    const navLogoutBtn = await screen.findByRole('button', {
      name: /Sair/i,
    });

    expect(navManageBtn).toBeInTheDocument();
    expect(navName).toBeInTheDocument();
    expect(navLogoutBtn).toBeInTheDocument();

    userEvent.click(navManageBtn);

    expect(history.location.pathname).toBe(adminRoute);

    userEvent.click(navLogoutBtn);

    expect(history.location.pathname).toBe(loginRoute);
  });

  it('Testa se é possível cadastrar um usuário', async () => {
    api.post = jest.fn().mockResolvedValue({ data: { status: 201 } });

    renderWithRouter(<App />);

    const formName = await screen.findByLabelText(/Nome/i);
    const formEmail = await screen.findByLabelText(/Email/i);
    const formPassword = await screen.findByLabelText(/Senha/i);
    const formRole = await screen.findByLabelText(/Tipo/i);
    const formSubmitBtn = await screen.findByRole('button', {
      name: /CADASTRAR/i,
    });

    expect(formSubmitBtn).toBeDisabled();

    userEvent.type(formName, validUserForm.name);
    userEvent.type(formEmail, validUserForm.email);
    userEvent.type(formPassword, validUserForm.password);
    userEvent.selectOptions(formRole, validUserForm.role);

    expect(formSubmitBtn).toBeEnabled();

    userEvent.click(formSubmitBtn);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(api.get).toHaveBeenCalled();
    });
  });

  it('Testa se mostra mensagem de erro se usuário já existe', async () => {
    api.post = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    renderWithRouter(<App />);

    const formName = await screen.findByLabelText(/Nome/i);
    const formEmail = await screen.findByLabelText(/Email/i);
    const formPassword = await screen.findByLabelText(/Senha/i);
    const formRole = await screen.findByLabelText(/Tipo/i);
    const formSubmitBtn = await screen.findByRole('button', {
      name: /CADASTRAR/i,
    });

    userEvent.type(formName, validUserForm.name);
    userEvent.type(formEmail, validUserForm.email);
    userEvent.type(formPassword, validUserForm.password);
    userEvent.selectOptions(formRole, validUserForm.role);
    userEvent.click(formSubmitBtn);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
    });

    const errorMessage = await screen.findByText(/E-mail já cadastrado/i);
    expect(errorMessage).toBeEnabled();
  });
});
