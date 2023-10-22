import React from 'react';
import { useHistory } from 'react-router';
import { CiLogout } from 'react-icons/ci';
import { CiDesktop } from 'react-icons/ci';

const NavbarComponent = () => {
  const isAdmin = window.location.pathname;
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('TOKEN_KEY');
    history.push('/logsin');
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#14532d',
        height: '80px',
        alignItems: 'center',
        padding: '0 40px 0 40px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <h2 style={{ color: 'white' }}>
          {window.location.pathname === '/admin' ? 'Painel Administrador' : 'Painel da Organização'}
        </h2>
        <CiDesktop style={{ fontSize: '40px', color: 'white', fontWeight: 'bolder' }}></CiDesktop>
      </div>

      <div
        onClick={handleLogout}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
      >
        <span style={{ fontSize: '20px', color: 'white' }}>Logout</span>
        <CiLogout style={{ fontSize: '30px', color: 'white', fontWeight: 'bolder' }}></CiLogout>
      </div>
    </div>
  );
};

NavbarComponent.propTypes = {};

export default NavbarComponent;
