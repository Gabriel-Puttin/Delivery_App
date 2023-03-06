import React, { useEffect } from 'react';
import Form from '../components/AdminPageComponents/Form';
import NavLink from '../components/AdminPageComponents/NavLink';
import { setToken } from '../services/requests';

export default function AdminPage() {
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setToken(userInfo.token);
  }, []);
  return (
    <div>
      <NavLink />
      <Form />
    </div>
  );
}
