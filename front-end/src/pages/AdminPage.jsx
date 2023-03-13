import React from 'react';
import AdminPageForm from '../components/AdminPage/AdminPageForm';
import AdminPageTable from '../components/AdminPage/AdminPageTable';
import NavBar from '../components/NavBar';

export default function AdminPage() {
  return (
    <div>
      <NavBar />
      <div
        className="d-flex flex-column align-items-center"
      >
        <AdminPageForm />
        <section
          style={ { width: '1200px' } }
          className="d-flex flex-column"
        >
          <h2 className="ms-2 align-self-start">Lista de usuários</h2>
          <AdminPageTable />
        </section>
      </div>
    </div>
  );
}
