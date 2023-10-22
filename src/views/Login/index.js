import React, { useContext, useState } from 'react';
import { Context } from '../../common/context/context';
import { useAlert } from 'react-alert';
import { login } from '../../services/login';
import { Container, Footer } from './styles';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { validateEmail } from '../../common/utils/validators';
import { useHistory } from 'react-router';
import loginLogo from '../../assets/login_logo.png';
import plantingLogo from '../../assets/planting.png';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setLoading } = useContext(Context);
  const alert = useAlert();
  const history = useHistory();

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const handleSubmit = async () => {
    const { email, password } = user;
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError(true);
      isValid = false;
      alert.error('E-mail inválido');
    }

    if (password === '') {
      setPasswordError(true);
      isValid = false;
      alert.error('Senha não pode estar em branco');
    }

    if (!isValid) return;

    setLoading(true);
    const response = await login(user);
    setLoading(false);

    if (!response.success) {
      return alert.error(response.message);
    }

    if (response.data.is_admin) {
      history.push('/admin');
    } else {
      history.push('/organizacoes');
    }
  };

  return (
    <Container>
      <Row style={{ justifyContent: 'center' }}>
        <Col md={12} lg={12}>
          <img src={plantingLogo} style={{ width: '300px', height: '300px' }} />
          <Form className="text-center">
            <Form.Group style={{ width: '300px' }} className="mb-3" controlId="formBasicEmail">
              <Form.Control
                style={{ borderRadius: '10px' }}
                type="email"
                placeholder="E-mail"
                isInvalid={emailError}
                value={user.email}
                onChange={(e) => {
                  handleChange('email', e.target.value);
                  setEmailError(false);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                style={{ borderRadius: '10px' }}
                type="password"
                placeholder="Senha"
                isInvalid={passwordError}
                value={user.password}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                onChange={(e) => {
                  handleChange('password', e.target.value);
                  setPasswordError(false);
                }}
              />
            </Form.Group>
            <Button
              style={{
                backgroundColor: '#22c55e',
                borderColor: '#22c55e',
                fontWeight: 'bolder',
                borderRadius: '10px'
              }}
              className="w-100 mb-3"
              onClick={() => handleSubmit()}
            >
              Entrar
            </Button>
            <a style={{ color: 'dimgrey' }} href={window.origin + '/cadastrar'}>
              Não possuí conta? Cadastre-se!
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

export default Login;
