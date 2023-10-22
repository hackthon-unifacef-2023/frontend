import { activeOrganization, getAll } from '../../../services/admin';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Context } from '../../../common/context/context';
import { useAlert } from 'react-alert';
import ModalAction from './ModalAction';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

const ModalUser = ({ openModal, handleCloseModal, user, callback }) => {
  const { setLoading } = useContext(Context);
  const alert = useAlert();

  const [eventModal, setShowEventModal] = useState(false);
  const [eventInfo, setEventInfo] = useState({
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
  });

  const handleEventModal = (item) => {
    setEventInfo(item);
    setShowEventModal(true);
  };

  const handleActiveOrganization = async () => {
    setLoading(true);
    const response = await activeOrganization(user.id);
    setLoading(false);

    if (!response.success) {
      handleCloseModal();
      return alert.error(response.message);
    }

    callback();
    handleCloseModal();

    return alert.success('Organização ativado com sucesso');
  };

  const handleGetOrganizations = async (eventId) => {
    setLoading(true);
    const response = await getAll();
    setLoading(false);

    let eventFound = {};

    if (response.success) {
      response.data.organizations.map((item) => {
        return item.events.find((event) => {
          if (event.id === eventId) {
            eventFound = event;
          }
        });
      });

      user.events.find((item) => {
        if (item.id === eventId) {
          item.is_active = true;
        }
      });

      setEventInfo(eventFound);

      return user;
    }
  };

  return (
    <>
      <ModalAction
        openModal={eventModal}
        info={eventInfo}
        handleCloseModal={() => setShowEventModal(false)}
        isStatic={true}
        callback={(id) => handleGetOrganizations(id)}
      />
      <Modal size="lg" centered show={openModal} onHide={() => handleCloseModal()}>
        <Modal.Header className="d-flex justify-content-start">
          <Modal.Title>Informações da Organização</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="p-2  justify-content-center w-100">
            <Form>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-2" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome"
                      value={user.name}
                      disabled={true}
                      style={{ borderRadius: '10px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="E-mail"
                      value={user.email}
                      disabled={true}
                      style={{ borderRadius: '10px' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="phone">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      type="string"
                      placeholder="Telefone"
                      value={user.phone}
                      disabled={true}
                      style={{ borderRadius: '10px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-2" controlId="description">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{ height: '100px', borderRadius: '10px' }}
                      placeholder="Descrição"
                      value={user.description}
                      disabled={true}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {user.has_address ? (
                <>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-2" controlId="zip_code">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control
                          type="string"
                          placeholder="CEP"
                          value={user.zip_code}
                          disabled={true}
                          style={{ borderRadius: '10px' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-2" controlId="state">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                          type="string"
                          placeholder="Estado"
                          value={user.state}
                          disabled={true}
                          style={{ borderRadius: '10px' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-2" controlId="city">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                          type="string"
                          placeholder="Cidade"
                          value={user.city}
                          disabled={true}
                          style={{ borderRadius: '10px' }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-2" controlId="city">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control
                          type="string"
                          placeholder="Rua"
                          value={user.street}
                          disabled={true}
                          style={{ borderRadius: '10px' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-2" controlId="district">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control
                          type="string"
                          placeholder="Bairro"
                          value={user.district}
                          disabled={true}
                          style={{ borderRadius: '10px' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-2" controlId="string">
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                          type="string"
                          placeholder="Número"
                          value={user.number}
                          disabled={true}
                          style={{ borderRadius: '10px' }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              ) : (
                <></>
              )}
            </Form>
          </Row>
          <Row style={{ textAlign: 'initial' }}>
            <Col>
              <h4>Listagem de Ações</h4>
            </Col>
          </Row>
          <Row className="overflow-auto w-100 mw-100">
            <Col>
              <table className="fl-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Categoria</th>
                    <th>Ativo</th>
                  </tr>
                </thead>
                <tbody>
                  {user.events.map((item, index) => {
                    return (
                      <tr
                        style={{ cursor: 'pointer' }}
                        key={index}
                        onClick={() => handleEventModal(item)}
                      >
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.reason}</td>
                        <td>{item.is_active ? 'Sim' : 'Não'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center" style={{ gap: '15px' }}>
          <Button style={{ width: '150px' }} variant="secondary" onClick={() => handleCloseModal()}>
            Fechar
          </Button>
          {user.is_active === 0 ? (
            <Button
              style={{ width: '150px', backgroundColor: '#22c55e', borderColor: '#22c55e' }}
              onClick={() => handleActiveOrganization()}
            >
              Ativar
            </Button>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalUser.propTypes = {
  openModal: PropTypes.bool,
  user: PropTypes.object,
  handleCloseModal: PropTypes.func,
  callback: PropTypes.func
};

export default ModalUser;
