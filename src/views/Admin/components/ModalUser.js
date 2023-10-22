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
          item = eventFound;
        }
      });

      setEventInfo(eventFound);

      return user;
    }

    setLoading(false);
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
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>Informações da Organização</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="p-2 justify-content-center ">
            <Form>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Control
                      type="text"
                      placeholder="Nome"
                      value={user.name}
                      disabled={true}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                      type="email"
                      placeholder="E-mail"
                      value={user.email}
                      disabled={true}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Control
                      type="string"
                      placeholder="Telefone"
                      value={user.phone}
                      disabled={true}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Control
                      as="textarea"
                      style={{ height: '100px' }}
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
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="zip_code">
                        <Form.Control
                          type="string"
                          placeholder="CEP"
                          value={user.zip_code}
                          disabled={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="city">
                        <Form.Control
                          type="string"
                          placeholder="Rua"
                          value={user.street}
                          disabled={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="district">
                        <Form.Control
                          type="string"
                          placeholder="Bairro"
                          value={user.district}
                          disabled={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="string">
                        <Form.Control
                          type="string"
                          placeholder="Número"
                          value={user.number}
                          disabled={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="state">
                        <Form.Control
                          type="string"
                          placeholder="Estado"
                          value={user.state}
                          disabled={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="city">
                        <Form.Control
                          type="string"
                          placeholder="Cidade"
                          value={user.city}
                          disabled={true}
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
          <Row style={{ textAlign: 'center' }}>
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
