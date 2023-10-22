import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Pagination, Row } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import { Container } from './styles';
import ModalAction from './components/ModalAction';
import { getAll } from '../../services/organization';
import PetCare from '../../assets/cards/pet_care.jpg';
import Reflorestation from '../../assets/cards/reflorestation.jpg';
import CommunityService from '../../assets/cards/community_service.jpg';
import GarbageCollector from '../../assets/cards/garbage_collector.jpg';
import NaturalDisaster from '../../assets/cards/natural_disaster.jpg';
import CommunityHealth from '../../assets/cards/communiy_health.jpg';
import Sustainability from '../../assets/cards/sustenaibility.jpg';

const Organizations = () => {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [info, setInfo] = useState([]);
  const { setLoading } = useContext(Context);
  const [eventInfo, setEventInfo] = useState({});

  useEffect(() => {
    handleGetEvents();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleGetEvents = async () => {
    setLoading(true);
    const response = await getAll();

    if (response.success) {
      setInfo(response.data.events);
    }

    setLoading(false);
  };

  const handleEvent = (userInfo) => {
    setEventInfo(userInfo);
    setShow(true);
    setIsEdit(true);

    console.log(userInfo);
  };

  const renderImages = (reason) => {
    switch (reason) {
      case 'Reflorestamento':
        return (
          <Card.Img style={{ width: '100%', height: '200px' }} variant="top" src={Reflorestation} />
        );
      case 'Desastres naturais':
        return (
          <Card.Img
            style={{ width: '100%', height: '200px' }}
            variant="top"
            src={NaturalDisaster}
          />
        );
      case 'Serviços sociais':
        return (
          <Card.Img
            style={{ width: '100%', height: '200px' }}
            variant="top"
            src={CommunityService}
          />
        );
      case 'Coleta de lixo':
        return (
          <Card.Img
            style={{ width: '100%', height: '200px' }}
            variant="top"
            src={GarbageCollector}
          />
        );
      case 'Saúde da comunidade':
        return (
          <Card.Img
            style={{ width: '100%', height: '200px' }}
            variant="top"
            src={CommunityHealth}
          />
        );
      case 'Causa animal':
        return <Card.Img style={{ width: '100%', height: '200px' }} variant="top" src={PetCare} />;
      default:
        return (
          <Card.Img style={{ width: '100%', height: '200px' }} variant="top" src={Sustainability} />
        );
    }
  };

  return (
    <>
      <ModalAction
        openModal={show}
        handleCloseModal={handleClose}
        info={eventInfo}
        isEdit={isEdit}
        callback={handleGetEvents}
      />
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
        <Row className="w-100 mw-100" style={{ gap: '55px', justifyContent: 'center' }}>
          {info.map((item, index) => {
            return (
              <Col key={index} sm={6} md={3} lg={3}>
                <Card style={{ width: '300px' }}>
                  {renderImages(item.reason)}
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      Categoria: {item.type} <br />
                      Razão: {item.reason} <br />
                      Situação: {item.is_active ? 'Ativa' : 'Inativa'}
                    </Card.Text>
                    <Button
                      onClick={() => handleEvent(item)}
                      style={{ backgroundColor: '#22c55e', borderColor: '#22c55e' }}
                    >
                      Mais Detalhes
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
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
