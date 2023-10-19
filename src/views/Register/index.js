import React, { useContext, useState } from 'react';
import { Context } from '../../common/context/context';
import { useAlert } from 'react-alert';
import { Container, Footer } from './styles';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { validateEmail } from '../../common/utils/validators';
import { create } from '../../services/register';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setLoading } = useContext(Context);
  const alert = useAlert();

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
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

    setLoading(true);
    const response = await create(user);
    setLoading(false);

    if (!response.success) {
      return alert.error(response.message);
    } else {
      setUser({
        name: '',
        email: '',
        password: ''
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
