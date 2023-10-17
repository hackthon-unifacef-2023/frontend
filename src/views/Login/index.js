import React, { useContext, useState } from 'react';
import { Context } from '../../common/context/context';
import { useAlert } from 'react-alert';
import { login } from '../../services/login';
import { Container, Footer } from './styles';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { validateEmail } from '../../common/utils/validators';
import { useHistory } from 'react-router';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setLoading, setAuth } = useContext(Context);
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

    setAuth(response.data.data);

    if (response.data.data.isAdmin) {
      history.push('/admin/usuarios');
    } else {
      history.push('/contador/usuarios');
    }
  };

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
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
            <Button variant="primary" className="w-100 mb-3" onClick={() => handleSubmit()}>
              Log In
            </Button>

            <a href={window.origin + '/cadastrar'}>Não possuí conta? Cadastre-se!</a>
          </Form>
        </Col>
      </Row>
      <Footer>
        <p style={{ fontWeight: 'bold', color: 'white' }}>Hackathon Uni-FACEF</p>
      </Footer>
    </Container>
  );
};

export default Login;
