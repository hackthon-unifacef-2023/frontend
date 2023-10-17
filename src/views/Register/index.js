import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../common/context/context';
import { useAlert } from 'react-alert';
import { Container, Footer } from './styles';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { validateEmail } from '../../common/utils/validators';
import { create, getAll } from '../../services/register';
import { maskCRC, removeMaskCRC } from '../../common/utils/masks';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    accountantLicense: '',
    accountingOfficeId: 'invalid',
    password: '',
  });
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    accountantLicenseError: false,
    accountingOfficeIdError: false,
    passwordError: false,
    confirmPasswordError: false,
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [offices, setOffices] = useState([]);
  const { setLoading } = useContext(Context);
  const alert = useAlert();

  useEffect(async () => {
    const response = await getAll();

    if (response.success) {
      setOffices(response.data.data);
    }
  }, []);

  const handleChange = (key, value) => {
    if (key !== 'accountantLicense') {
      setUser({ ...user, [key]: value });
    } else if (key === 'accountantLicense' && value.length < 14) {
      setUser({ ...user, [key]: value });
    }
  };

  const handleError = (field, boolean) => {
    setErrors((prev) => ({ ...prev, [field]: boolean }));
  };

  const handleSubmit = async () => {
    const { name, email, accountantLicense, accountingOfficeId, password } = user;
    let isValid = true;

    if (name === '') {
      handleError('nameError', true);
      alert.error('Nome não pode estar em branco.');
      isValid = false;
    }

    if (!validateEmail(email)) {
      handleError('emailError', true);
      alert.error('E-mail inválido');
      isValid = false;
    }

    if (accountantLicense === '') {
      handleError('accountantLicenseError', true);
      alert.error('CRC não pode estar em branco.');
      isValid = false;
    }

    if (accountingOfficeId === 'invalid') {
      handleError('officeError', true);
      alert.error('Escritório não pode estar em branco.');
      isValid = false;
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

    user.accountantLicense = removeMaskCRC(accountantLicense);

    setLoading(true);
    const response = await create(user);
    setLoading(false);

    if (!response.success) {
      handleChange('accountantLicense', accountantLicense);

      return alert.error(response.message);
    } else {
      setUser({
        name: '',
        email: '',
        accountantLicense: '',
        accountingOfficeId: '',
        password: '',
      });
      setConfirmPassword('');
      return alert.success('Usuário cadastrado com sucesso!');
    }
  };

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <Form>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Control
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
                <Form.Group className="mb-3" controlId="formBasic2">
                  <Form.Control
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
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasic3">
                  <Form.Control
                    style={{ textTransform: 'uppercase' }}
                    type="text"
                    placeholder="CRC (Ex: 1SP123456/6-0)"
                    isInvalid={errors.accountantLicenseError}
                    value={user.accountantLicense}
                    onChange={(e) => {
                      handleChange('accountantLicense', maskCRC(e.target.value));
                      handleError('accountantLicenseError', false);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasic4">
                  <Form.Control
                    as="select"
                    size="small"
                    isInvalid={errors.officeError}
                    value={user.accountingOfficeId}
                    onChange={(e) => {
                      handleChange('accountingOfficeId', e.target.value);
                      handleError('officeError', false);
                    }}>
                    <option value="invalid">Selecione o Escritório</option>
                    {offices.map((office, key) => {
                      return (
                        <option style={{ textTransform: 'uppercase' }} key={key} value={office.id}>
                          {office.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Senha"
                    isInvalid={errors.passwordError}
                    value={user.password}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    onChange={(e) => {
                      handleChange('password', e.target.value);
                      handleError('passwordError', false);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                  <Form.Control
                    type="password"
                    placeholder="Confirmar Senha"
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

            <Button variant="primary" className="w-100 mb-3" onClick={() => handleSubmit()}>
              Cadastrar
            </Button>

            <a href={window.origin + '/login'}>Já possuí conta? Realize seu login.</a>
          </Form>
        </Col>
      </Row>
      <Footer>
        <p style={{ fontWeight: 'bold', color: 'white' }}>Hackathon Uni-FACEF</p>
      </Footer>
    </Container>
  );
};

export default Register;
