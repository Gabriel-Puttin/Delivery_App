import React from 'react';
import Form from '../components/AdminPageComponents/Form';
import Table from '../components/AdminPageComponents/Table';
import NavBar from '../components/NavBar';

export default function AdminPage() {
  return (
    <div>
      <NavBar />
      <Form />
      <Table />
    </div>
  );
}
