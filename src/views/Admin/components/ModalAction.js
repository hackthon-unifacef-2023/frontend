import React, { useContext } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Context } from '../../../common/context/context';
import { useAlert } from 'react-alert';
import { create } from '../../../services/organization';
import { activeEvent } from '../../../services/admin';

const ModalAction = ({ openModal, handleCloseModal, info, isStatic, callback = false }) => {
  const { setLoading } = useContext(Context);
  const alert = useAlert();

  const handleActiveEvent = async () => {
    setLoading(true);
    const response = await activeEvent(info.id);
    setLoading(false);

    if (!response.success) {
      return alert.error(response.message);
    }

    callback(info.id);
    handleCloseModal();

    return alert.success('Evento cadastrado com sucesso');
  };

  return (
    <Modal
      backdrop={isStatic ? 'static' : ''}
      centered
      show={openModal}
      size="lg"
      onHide={() => {
        handleCloseModal();
      }}
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>{'Detalhes da Ação'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="p-2 justify-content-center ">
          <Form>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" placeholder="Nome" value={info.name} disabled={true} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control type="text" placeholder="Nome" value={info.type} disabled={true} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    value={info.reason}
                    disabled={true}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="pix_code">
                  <Form.Label>Código Pagamento</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Código Pix"
                    value={info.pix_code}
                    disabled={true}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Descrição"
                    style={{ height: '300px' }}
                    value={info.description}
                    disabled={true}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Row>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center" style={{ gap: '15px' }}>
        <Button style={{ width: '150px' }} variant="secondary" onClick={() => handleCloseModal()}>
          Fechar
        </Button>
        {info.is_active === 0 ? (
          <Button
            style={{ width: '150px', backgroundColor: '#22c55e', borderColor: '#22c55e' }}
            onClick={() => handleActiveEvent()}
          >
            Aprovar
          </Button>
        ) : (
          <></>
        )}
      </Modal.Footer>
    </Modal>
  );
};

ModalAction.propTypes = {
  openModal: PropTypes.bool,
  info: PropTypes.object,
  handleCloseModal: PropTypes.func,
  callback: PropTypes.func,
  isStatic: PropTypes.bool
};

export default ModalAction;
