import React, { useContext, useEffect, useState } from 'react';
import { Col, Pagination, Row } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import { getAll } from '../../services/admin';
import { Container } from './styles';
import ModalUser from './components/ModalUser';
import './styles.css';

const Admin = () => {
  const { setLoading } = useContext(Context);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState([]);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    is_active: null,
    description: '',
    phone: '',
    has_address: null,
    city: '',
    state: '',
    street: '',
    number: '',
    zip_code: '',
    district: ' ',
    event_count: null,
    created_at: '',
    updated_at: '',
    events: [
      {
        id: '',
        name: '',
        points: null,
        description: '',
        type: '',
        reason: '',
        organization_id: '',
        pix_code: '',
        is_active: null,
        created_at: '',
        updated_at: ''
      }
    ]
  });

  useEffect(() => {
    handleGetOrganizations();
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleUser = (userInfo) => {
    setUser(userInfo);
    setShow(true);
  };

  const handleGetOrganizations = async () => {
    setLoading(true);
    const response = await getAll();

    if (response.success) {
      setInfo(response.data.organizations);
    }

    setLoading(false);
  };

  return (
    <>
      <ModalUser
        openModal={show}
        handleCloseModal={handleClose}
        user={user}
        callback={handleGetOrganizations}
      />
      <Container>
        <Row className="overflow-auto w-100 mw-100">
          <Col>
            <table className="fl-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Ativo</th>
                  <th>Estado</th>
                  <th>Cidade</th>
                  <th>Número de Ações</th>
                  <th>Data de Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {info.map((user, index) => {
                  return (
                    <tr style={{ cursor: 'pointer' }} key={index} onClick={() => handleUser(user)}>
                      <td>{user.name}</td>
                      <td>{user.is_active ? 'Sim' : 'Não'}</td>
                      <td>{user.state ? user.state : '---'}</td>
                      <td>{user.city ? user.city : '---'}</td>
                      <td>{user.event_count}</td>
                      <td>{user.created_at}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="mt-5 w-100 mw-100">
          <Col className="d-flex justify-content-end">
            <Pagination>
              <Pagination.Item>1</Pagination.Item>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
