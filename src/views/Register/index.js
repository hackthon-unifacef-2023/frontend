import React, { useContext, useState } from 'react';
import { Context } from '../../common/context/context';
import { useAlert } from 'react-alert';
import { Container, Footer } from './styles';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { create } from '../../services/register';
import { useHistory } from 'react-router';
import CheckboxComponent from '../../common/components/Checkbox';
import { states } from '../../enums/state';
import loginLogo from '../../assets/login_logo.png';

const Register = () => {
  const history = useHistory();
  const alert = useAlert();
  const { setLoading } = useContext(Context);

  const [confirmPassword, setConfirmPassword] = useState('');

  const [user, setUser] = useState({
    city: '',
    description: '',
    district: '',
    email: '',
    name: '',
    number: '',
    password: '',
    phone: '',
    state: 'AC',
    street: '',
    zip_code: ''
  });

  const [errors, setErrors] = useState({
    cityError: false,
    descriptionError: false,
    districtError: false,
    emailError: false,
    nameError: false,
    numberError: false,
    passwordError: false,
    phoneError: false,
    stateError: false,
    streetError: false,
    zip_codeError: false
  });

  const [has_address, setHasAddress] = useState(false);

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const handleHasAddress = () => {
    setHasAddress(!has_address);

    handleError('cityError', false);
    handleError('districtError', false);
    handleError('numberError', false);
    handleError('stateError', false);
    handleError('streetError', false);
    handleError('zip_codeError', false);

    setUser({ ...user, city: '', district: '', number: '', state: 'AC', street: '', zip_code: '' });

    return has_address;
  };

  const handleError = (field, boolean) => {
    setErrors((prev) => ({ ...prev, [field]: boolean }));
  };

  const handleChangeState = (state) => {
    return setUser(() => ({ ...user, state }));
  };

  const handleSubmit = async () => {
    const {
      city,
      description,
      district,
      email,
      name,
      number,
      password,
      phone,
      state,
      street,
      zip_code
    } = user;

    let isValid = true;

    if (name === '') {
      handleError('nameError', true);
      alert.error('Nome não pode estar em branco.');
      isValid = false;
    }

    if (description === '') {
      handleError('descriptionError', true);
      alert.error('Descrição não pode estar em branco.');
      isValid = false;
    }

    if (email === '') {
      handleError('emailError', true);
      alert.error('E-mail inválido');
      isValid = false;
    }

    if (phone === '') {
      handleError('phoneError', true);
      alert.error('Telefone não pode estar em branco.');
      isValid = false;
    }

    if (has_address === true) {
      if (zip_code === '') {
        handleError('zip_codeError', true);
        alert.error('CEP não pode estar em branco.');
        isValid = false;
      }

      if (street === '') {
        handleError('streetError', true);
        alert.error('Rua não pode estar em branco.');
        isValid = false;
      }

      if (district === '') {
        handleError('districtError', true);
        alert.error('Bairro não pode estar em branco.');
        isValid = false;
      }

      if (number === '') {
        handleError('numberError', true);
        alert.error('Número não pode estar em branco.');
        isValid = false;
      }

      if (state === '') {
        handleError('stateError', true);
        alert.error('Estado não pode estar em branco.');
        isValid = false;
      }

      if (city === '') {
        handleError('cityError', true);
        alert.error('Cidade não pode estar em branco.');
        isValid = false;
      }
    }

    if (password.length < 8) {
      handleError('passwordError', true);
      alert.error('Senha deve ter ao menos 8 caracteres');
      isValid = false;
    }

    if (password !== confirmPassword) {
      handleError('passwordError', true);
      handleError('confirmPasswordError', true);
      alert.error('Senhas não correspondem');
      isValid = false;
    }

    if (!isValid) return;
    if (has_address === false) {
      delete user.city;
      delete user.district;
      delete user.number;
      delete user.state;
      delete user.street;
      delete user.zip_code;
    }

    user.has_address = has_address;

    setLoading(true);
    const response = await create(user);
    setLoading(false);

    if (!response.success) {
      return alert.error(response.message);
    } else {
      setUser({
        city: '',
        description: '',
        district: '',
        email: '',
        name: '',
        number: '',
        password: '',
        phone: '',
        state: '',
        street: '',
        zip_code: ''
      });

      setConfirmPassword('');

      history.push('/login');

      return alert.success('Organização cadastrada com sucesso!');
    }
  };

  return (
    <Container>
      <Row style={{ width: '30%' }}>
        <Col className="text-center">
          <Form>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control
                    style={{ borderRadius: '10px' }}
                    type="text"
                    placeholder="Nome"
                    isInvalid={errors.nameError}
                    value={user.name}
                    onChange={(e) => {
                      handleChange('name', e.target.value);
                      handleError('nameError', false);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Control
                    style={{ borderRadius: '10px' }}
                    type="text"
                    placeholder="Descrição"
                    isInvalid={errors.descriptionError}
                    value={user.description}
                    onChange={(e) => {
                      handleChange('description', e.target.value);
                      handleError('descriptionError', false);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                    style={{ borderRadius: '10px' }}
                    type="email"
                    placeholder="E-mail"
                    isInvalid={errors.emailError}
                    value={user.email}
                    onChange={(e) => {
                      handleChange('email', e.target.value);
                      handleError('emailError', false);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Control
                    style={{ borderRadius: '10px' }}
                    type="string"
                    placeholder="Telefone"
                    isInvalid={errors.phoneError}
                    value={user.phone}
                    onChange={(e) => {
                      handleChange('phone', e.target.value);
                      handleError('emailError', false);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: 'flex', justifyContent: 'left' }} md={12}>
                <CheckboxComponent
                  isChecked={has_address}
                  handleCheckboxChange={() => handleHasAddress()}
                />
              </Col>
            </Row>

            {has_address ? (
              <>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="zip_code">
                      <Form.Control
                        type="string"
                        style={{ borderRadius: '10px' }}
                        placeholder="CEP"
                        isInvalid={errors.zip_codeError}
                        value={user.zip_code}
                        onChange={(e) => {
                          handleChange('zip_code', e.target.value);
                          handleError('zip_codeError', false);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="city">
                      <Form.Control
                        type="string"
                        style={{ borderRadius: '10px' }}
                        placeholder="Rua"
                        isInvalid={errors.streetError}
                        value={user.street}
                        onChange={(e) => {
                          handleChange('street', e.target.value);
                          handleError('streetError', false);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="district">
                      <Form.Control
                        type="string"
                        style={{ borderRadius: '10px' }}
                        placeholder="Bairro"
                        isInvalid={errors.districtError}
                        value={user.district}
                        onChange={(e) => {
                          handleChange('district', e.target.value);
                          handleError('districtError', false);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="string">
                      <Form.Control
                        type="string"
                        placeholder="Número"
                        style={{ borderRadius: '10px' }}
                        isInvalid={errors.numberError}
                        value={user.number}
                        onChange={(e) => {
                          handleChange('number', e.target.value);
                          handleError('numberError', false);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="state">
                      <Form.Select
                        style={{
                          width: '100%',
                          height: '37px',
                          borderColor: 'darkGrey',
                          backgroundColor: 'white',
                          color: 'dimgrey',
                          borderRadius: '10px'
                        }}
                        aria-label="Default select example"
                        value={user.state}
                        onChange={(event) => handleChangeState(event.target.value)}
                      >
                        {states.map((item) => {
                          return (
                            <option key={item.code} value={item.code}>
                              {item.code} - {item.name}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="city">
                      <Form.Control
                        type="string"
                        placeholder="Cidade"
                        style={{ borderRadius: '10px' }}
                        isInvalid={errors.cityError}
                        value={user.city}
                        onChange={(e) => {
                          handleChange('city', e.target.value);
                          handleError('cityError', false);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            ) : (
              <></>
            )}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Senha"
                    style={{ borderRadius: '10px' }}
                    isInvalid={errors.passwordError}
                    value={user.password}
                    onChange={(e) => {
                      handleChange('password', e.target.value);
                      handleError('passwordError', false);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Control
                    type="password"
                    placeholder="Confirmar Senha"
                    style={{ borderRadius: '10px' }}
                    isInvalid={errors.confirmPasswordError}
                    value={confirmPassword}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      handleError('confirmPasswordError', false);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              style={{ backgroundColor: '#22c55e', borderColor: '#22c55e' }}
              className="w-100 mb-3"
              onClick={() => handleSubmit()}
            >
              Cadastrar
            </Button>

            <a href={window.origin + '/login'} style={{ color: 'dimgrey' }}>
              Já possuí conta? Realize seu login.
            </a>
          </Form>
        </Col>
      </Row>
      <Footer>
        <img src={loginLogo} style={{ width: '100%', height: '100%' }} />
      </Footer>
    </Container>
  );
};

export default Register;
