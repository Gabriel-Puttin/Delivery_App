// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
  // const mountedRef = useRef(true);

  const login = useCallback((newUser = undefined) => {
    // console.log('login');
    if (newUser) localStorage.setItem('user', JSON.stringify(newUser));
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (!userInfo) return;
    setUser(userInfo);
    setToken(userInfo.token);
  }, []);

  const logout = useCallback(() => {
    // console.log('logout');
    localStorage.removeItem('user');
    setUser();
  }, []);

  const fetchUserList = useCallback(async () => {
    // console.log('fetchUserList');
    const users = await requestData('/users');
    // if (!mountedRef.current) return;
    setUserList(users);
  }, []);

  const fetchOrderDetails = useCallback(async (id) => {
    // console.log('fetchOrderDetails');
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
    const total = orderItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total);
  }, [orderItems]);

  useEffect(() => {
    login();
    // return () => {
    //   mountedRef.current = false;
    // };
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
