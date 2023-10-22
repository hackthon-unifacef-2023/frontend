import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router';

const NavbarComponent = () => {
  const isAdmin = window.location.pathname;
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('TOKEN_KEY');
    history.push('/login');
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{
        backgroundColor: '#22c55e',
        borderColor: '#22c55e',
        display: 'flex',
        justifyContent: 'flex-start'
      }}
    >
      <Container>
        <Navbar.Brand
          style={{
            color: 'white',
            fontWeight: 'bolder',
            display: 'flex',
            justifyContent: 'flex-start',
            fontSize: '24px',
            cursor: 'normal'
          }}
        >
          {isAdmin === '/admin' ? 'Painel Admin' : 'Painel da Organização'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              style={{ fontWeight: 'bolder', fontSize: '16px', color: 'white' }}
              onClick={handleLogout}
            >
              Sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavbarComponent.propTypes = {};

export default NavbarComponent;
