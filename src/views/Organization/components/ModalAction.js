import React, { useContext, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Context } from '../../../common/context/context';
import { useAlert } from 'react-alert';
import { create } from '../../../services/organization';

const ModalAction = ({ openModal, handleCloseModal, info, callback, isEdit }) => {
  const { setLoading } = useContext(Context);
  const alert = useAlert();

  const types = [
    { name: 'AUXILIO_VOLUNTARIO', label: 'Auxílio voluntário' },
    { name: 'AUXILIO_FINANCEIRO', label: 'Auxílio financeiro' }
  ];

  const reasons = [
    { name: 'REFLORESTAMENTO', label: 'Reflorestamento' },
    { name: 'DESASTRES_NATURAIS', label: 'Desastres Naturais' },
    { name: 'SERVIÇOS_SOCIAIS', label: 'Serviços Sociais' },
    { name: 'COLETA_DE_LIXO', label: 'Coleta de Lixo' },
    { name: 'SAUDE_DA_COMUNIDADE', label: 'Saude da Comunidade' },
    { name: 'CAUSA_ANIMAL', label: 'Causa Animal' }
  ];

  const [event, setEvent] = useState({
    description: '',
    name: '',
    pix_code: '',
    reason: 'REFLORESTAMENTO',
    type: 'AUXILIO_VOLUNTARIO'
  });

  const [errors, setErrors] = useState({
    descriptionError: false,
    nameError: false,
    pix_codeError: false,
    reasonError: false,
    typeError: false
  });

  const handleChange = (key, value) => {
    setEvent({ ...event, [key]: value });
  };

  const handleError = (field, boolean) => {
    setErrors((prev) => ({ ...prev, [field]: boolean }));
  };

  const handleSaveEvent = async () => {
    let isValid = true;

    if (event.name === '') {
      handleError('nameError', true);
      alert.error('Nome não pode estar em branco');
      isValid = false;
    }

    if (event.reason === '') {
      handleError('reasonError', true);
      alert.error('Selecione a razão');
      isValid = false;
    }

    if (event.type === '') {
      handleError('typeError', true);
      alert.error('Selecione o tipo');
      isValid = false;
    }

    if (event.type === 'AUXILIO_FINANCEIRO') {
      if (event.pix_code === '') {
        handleError('pix_codeError', true);
        alert.error('Código pix não pode estar em branco');
        isValid = false;
      }
    }

    if (event.description === '') {
      handleError('descriptionError', true);
      alert.error('Descrição não pode estar em branco');
      isValid = false;
    }

    if (!isValid) return;
    if (event.pix_code !== 'AUXILIO_FINANCEIRO') delete event.pix_code;

    setLoading(true);
    const response = await create(event);
    setLoading(false);

    if (!response.success) {
      return alert.error(response.message);
    }

    callback();
    handleCloseModal();

    return alert.success('Evento cadastrado com sucesso');
  };

  const handleChangeState = (type) => {
    return setEvent(() => ({ ...event, type }));
  };

  return (
    <Modal
      centered
      show={openModal}
      size="lg"
      onHide={() => {
        handleCloseModal();
      }}
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>{isEdit ? 'Detalhes da Ação' : 'Cadastrar Ação'}</Modal.Title>
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
                    isInvalid={errors.nameError}
                    value={isEdit ? info.name : event.name}
                    onChange={(e) => {
                      handleChange('name', e.target.value);
                      handleError('nameError', false);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Select
                    style={{
                      width: '100%',
                      height: '37px',
                      borderColor: 'darkGrey',
                      backgroundColor: 'white',
                      color: 'dimgrey'
                    }}
                    aria-label="Default select example"
                    value={event.type}
                    onChange={(event) => handleChangeState(event.target.value)}
                  >
                    {types.map((item) => {
                      return (
                        <option key={item.name} value={item.name}>
                          {item.label}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Select
                    style={{
                      width: '100%',
                      height: '37px',
                      borderColor: 'darkGrey',
                      backgroundColor: 'white',
                      color: 'dimgrey'
                    }}
                    aria-label="Default select example"
                    value={event.type}
                    onChange={(event) => handleChangeState(event.target.value)}
                  >
                    {reasons.map((item) => {
                      return (
                        <option key={item.name} value={item.name}>
                          {item.label}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="pix_code">
                  <Form.Control
                    style={{ width: '100%' }}
                    type="text"
                    placeholder="Código Pix"
                    isInvalid={errors.pix_codeError}
                    value={isEdit ? info.pix_code : event.pix_code}
                    disabled={event.type !== 'AUXILIO_FINANCEIRO' ? true : false}
                    onChange={(e) => {
                      handleChange('pix_code', e.target.value);
                      handleError('pix_codeError', false);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Control
                    as="textarea"
                    placeholder="Descrição"
                    style={{ height: '300px' }}
                    isInvalid={errors.descriptionError}
                    value={isEdit ? info.description : event.description}
                    onChange={(e) => {
                      handleChange('description', e.target.value);
                      handleError('descriptionError', false);
                    }}
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
        {isEdit ? (
          <Button style={{ width: '150px' }} variant="danger" onClick={() => handleCloseModal()}>
            Deletar
          </Button>
        ) : (
          <></>
        )}
        <Button
          style={{ width: '150px', backgroundColor: '#22c55e', borderColor: '#22c55e' }}
          onClick={() => handleSaveEvent()}
        >
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalAction.propTypes = {
  openModal: PropTypes.bool,
  info: PropTypes.object,
  handleCloseModal: PropTypes.func,
  callback: PropTypes.func,
  isEdit: PropTypes.bool
};

export default ModalAction;
