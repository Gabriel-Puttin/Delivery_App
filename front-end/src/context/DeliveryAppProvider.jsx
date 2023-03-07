import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import DeliveryAppContext from './DeliveryAppContext';
import { setToken } from '../services/requests';

function DeliveryAppProvider({ children }) {
  const [user, setUser] = useState();

  const login = useCallback((newUser = undefined) => {
    console.log('login');
    if (newUser) localStorage.setItem('user', JSON.stringify(newUser));
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (!userInfo) return;
    setUser(userInfo);
    setToken(userInfo.token);
  }, []);

  const logout = useCallback(() => {
    console.log('logout');
    localStorage.removeItem('user');
    setUser();
  }, []);

  useEffect(() => {
    console.log('Context');
    login();
  }, [login]);

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
  }), [user, login, logout]);

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
