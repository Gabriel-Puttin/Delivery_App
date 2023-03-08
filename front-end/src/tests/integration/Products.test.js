import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './helpers/renderWithRouter';
import api from '../../services/requests';
import { getProductsResponse } from './mocks/products.mock';
import { getSellersResponse } from './mocks/users.mock';

const productsRoute = '/customer/products';
const checkoutRoute = '/customer/checkout';

const cartBtnTestId = 'customer_products__button-cart';

describe('testando página Products', () => {
  beforeEach(() => {
    global.localStorage.clear();
    api.get = jest.fn()
      .mockResolvedValueOnce({ data: getProductsResponse })
      .mockResolvedValueOnce({ data: getSellersResponse });
    cleanup();
  });

  it('Testa se adição e remoção de produtos funciona corretamente', async () => {
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

    expect(itemQtyInputs[4].value).toBe('0');
    userEvent.type(itemQtyInputs[4], '-1000');
    expect(itemQtyInputs[4].value).toBe('0');

    expect(cartBtnValue.innerHTML).toBe('0,00');
  });

  it('Testa se redirecionamento para checkout funciona corretamente', async () => {
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

  // it('Testa se é possível cadastrar um usuário', async () => {
  //   api.post = jest.fn().mockResolvedValue({ data: { status: 201 } });
  //   api.get = jest.fn().mockResolvedValue({ data: getProductsResponse });

  //   const { history } = renderWithRouter(<App />, { initialEntries: [registerRoute] });

  //   const formName = await screen.findByLabelText(/Nome/i);
  //   const formEmail = await screen.findByLabelText(/Email/i);
  //   const formPassword = await screen.findByLabelText(/Senha/i);
  //   const formSubmitBtn = await screen.findByRole('button', {
  //     name: /CADASTRAR/i,
  //   });

  //   expect(formSubmitBtn).toBeDisabled();

  //   userEvent.type(formName, validUserForm.name);
  //   userEvent.type(formEmail, validUserForm.email);
  //   userEvent.type(formPassword, validUserForm.password);

  //   expect(formSubmitBtn).toBeEnabled();

  //   userEvent.click(formSubmitBtn);

  //   await waitFor(() => {
  //     expect(api.post).toHaveBeenCalled();
  //     expect(api.get).toHaveBeenCalled();
  //     expect(history.location.pathname).toBe(productsRoute);
  //   });
  // });

  // it('Testa se mostra mensagem de erro se usuário já existe', async () => {
  //   api.post = jest.fn().mockImplementation(() => {
  //     throw new Error();
  //   });

  //   renderWithRouter(<App />, { initialEntries: [registerRoute] });

  //   const formName = await screen.findByLabelText(/Nome/i);
  //   const formEmail = await screen.findByLabelText(/Email/i);
  //   const formPassword = await screen.findByLabelText(/Senha/i);
  //   const formSubmitBtn = await screen.findByRole('button', {
  //     name: /CADASTRAR/i,
  //   });

  //   userEvent.type(formName, validUserForm.name);
  //   userEvent.type(formEmail, validUserForm.email);
  //   userEvent.type(formPassword, validUserForm.password);
  //   userEvent.click(formSubmitBtn);

  //   await waitFor(() => {
  //     expect(api.post).toHaveBeenCalled();
  //   });

  //   const errorMessage = await screen.findByText(/E-mail já cadastrado/i);
  //   expect(errorMessage).toBeEnabled();
  // });
});
