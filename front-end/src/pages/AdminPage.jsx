import React from 'react';
import AdminPageForm from '../components/AdminPage/AdminPageForm';
import AdminPageTable from '../components/AdminPage/AdminPageTable';
import NavBar from '../components/NavBar';

export default function AdminPage() {
  return (
    <div>
      <NavBar />
      <AdminPageForm />
      <AdminPageTable />
    </div>
  );
}
