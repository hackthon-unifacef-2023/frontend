import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Pagination, Row } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import { Container } from './styles';
import { maskCnpj, maskPhone } from '../../common/utils/masks';
import ModalAction from './components/ModalAction';
import { getAll } from '../../services/organization';

const Organizations = () => {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [info, setInfo] = useState([]);
  const { setLoading } = useContext(Context);

  useEffect(() => {
    handleGetEvents();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleModal = (value) => {
    handleShow();

    setLoading(true);
    handleGetEvents();
    setLoading(false);
  };

  const handleGetEvents = async () => {
    setLoading(true);
    const response = await getAll();

    if (response.success) {
      setInfo(response.data.events);
    }

    setLoading(false);
  };

  return (
    <>
      <Container>
        <Row className="mb-3 w-100 mw-100" style={{ justifyContent: 'start' }}>
          <Col md={6}>
            <Button
              style={{
                width: '200px',
                fontWeight: 'bolder',
                fontSize: '16px',
                backgroundColor: '#22c55e',
                borderColor: '#22c55e'
              }}
              onClick={() => {
                handleShow();
                setIsEdit(false);
              }}
            >
              Criar Nova Ação
            </Button>
          </Col>
        </Row>
        <Row className=" w-100 mw-100" style={{ gap: '10px', justifyContent: 'flex-start' }}>
          {info.map((item) => {
            return (
              <div style={{ width: '100%' }} key={item.id}>
                <Col sm={6} md={3} lg={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        Categoria: {item.type} <br />
                        Razão: {item.reason}{' '}
                      </Card.Text>
                      <Button
                        onClick={() => {
                          setIsEdit(true);
                          handleShow();
                        }}
                        style={{ backgroundColor: '#22c55e', borderColor: '#22c55e' }}
                      >
                        Mais Detalhes
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <ModalAction
                  openModal={show}
                  handleCloseModal={handleClose}
                  info={item}
                  isEdit={isEdit}
                  callback={handleGetEvents}
                />
              </div>
            );
          })}
          {!isEdit && (
            <ModalAction
              openModal={show}
              handleCloseModal={handleClose}
              info={{}}
              isEdit={isEdit}
              callback={handleGetEvents}
            />
          )}
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

export default Organizations;
