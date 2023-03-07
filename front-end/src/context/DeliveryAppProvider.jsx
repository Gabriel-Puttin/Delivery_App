import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import DeliveryAppContext from './DeliveryAppContext';
import { requestData, setToken } from '../services/requests';

function DeliveryAppProvider({ children }) {
  const [user, setUser] = useState();
  const [userList, setUserList] = useState([]);
  const [orderInfo, setOrderInfo] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const login = useCallback((newUser = undefined) => {
    if (newUser) localStorage.setItem('user', JSON.stringify(newUser));
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (!userInfo) return;
    setUser(userInfo);
    setToken(userInfo.token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser();
  }, []);

  const fetchUserList = useCallback(async () => {
    const users = await requestData('/users');
    setUserList(users);
  }, []);

  const fetchOrderDetails = useCallback(async (id) => {
    const order = await requestData(`/sales/${id}`);

    const { products, ...orderData } = order;

    const formatedItems = products.map((p) => {
      const { SalesProduct, ...product } = p;
      const { quantity } = SalesProduct;
      return { ...product, quantity };
    });

    setOrderInfo(orderData);
    setOrderItems(formatedItems);
  }, []);

  useEffect(() => {
    if (!orderItems) return;
    const total = orderItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total);
  }, [orderItems]);

  useEffect(() => {
    login();
  }, [login]);

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    userList,
    fetchUserList,
    orderInfo,
    fetchOrderDetails,
    orderItems,
    totalPrice,
  }), [
    user, login, logout,
    userList, fetchUserList,
    orderInfo, fetchOrderDetails, orderItems, totalPrice]);

  return (
    <DeliveryAppContext.Provider value={ contextValue }>
      {children}
    </DeliveryAppContext.Provider>
  );
}

DeliveryAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeliveryAppProvider;
