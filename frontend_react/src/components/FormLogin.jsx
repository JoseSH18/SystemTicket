import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./style.css"; 



const endpoint = 'http://localhost:8000/api/login'
const FormLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post(endpoint, {
              email: email,
              password: password,
          });
  
          const token = response.data.token;
  
          // Aquí puedes guardar el token de acceso en el almacenamiento local o en las cookies
          // Ejemplo utilizando el almacenamiento local:
          localStorage.setItem('token', token);

  
  
          // Redireccionar al usuario a la página deseada después del inicio de sesión exitoso
          navigate('/');
      } catch (error) {
          console.error(error.response.data); // Manejar el error de autenticación según tus necesidades
      }
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className="mr-auto">Inicio de Sesión</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/register">Registrar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="background">
        <Container className="form-container" style={{ width: "40vw" }}>
          <h2>Inicio de Sesión</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese el email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            </Form.Group>

            <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese la contraseña"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            </Form.Group>

            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  )
}

export default FormLogin