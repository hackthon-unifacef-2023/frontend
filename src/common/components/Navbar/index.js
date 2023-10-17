import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router';

const NavbarComponent = () => {
  let auth = window.location.pathname.split('/');
  auth = auth[1];
  const history = useHistory();

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>Hackathon Uni-FACEF</Navbar.Brand>
        <Nav className="me-auto">
          {auth === 'admin' ? (
            <>
              <Nav.Link onClick={() => history.push('/admin/usuarios')}>
                Controle de Usuários
              </Nav.Link>
              <Nav.Link onClick={() => history.push('/admin/escritorios')}>
                Controle de Escritórios
              </Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={() => history.push('/contador/usuarios')}>
              Controle de Clientes
            </Nav.Link>
          )}
          <Nav.Link
            onClick={() => {
              localStorage.removeItem('TOKEN_KEY');
              history.push('/login');
            }}>
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

NavbarComponent.propTypes = {};

export default NavbarComponent;
