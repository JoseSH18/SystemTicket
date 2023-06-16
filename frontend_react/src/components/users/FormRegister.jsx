import { Form, Button, Container, Navbar, Nav } from "react-bootstrap";
import "../css/style.css"; 
import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

const endpoint = 'http://localhost:8000/api/register'
export const FormRegister = () => {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPassword_Confirmation] = useState('')
  const [last_Name, setLast_Name] = useState('')
  const [second_Last_Name, setSecond_Last_Name] = useState('')
  const navigate = useNavigate()
  const store = async (e) =>{
    e.preventDefault()
    await axios.post(endpoint, {name: name, email: email, password: password, password_confirmation: password_confirmation
        , last_Name: last_Name ,second_Last_Name: second_Last_Name})
        .then(() => {
          navigate('/')
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            const errors = error.response.data.errors;
            setErrors(errors);
          } else {
            // Manejo de otros tipos de errores
          }
        });
    
  }
  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="navbar-brand">Registro</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/login" className="nav-link">Iniciar Sesión</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <div className="background">
       
      <Container className="form-container" style={{ width: "40vw" }}>
        <h2>Registro</h2>
        <Form onSubmit={store}>
          <Form.Group controlId="formBasicEmail" className="group">
          <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese el email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            {errors.email && <span className="error text-danger">{errors.email[0]}</span>}
          </Form.Group>

          <Form.Group controlId="formBasicName" className="group">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
             type="text"
             placeholder="Ingrese el nombre"
             name="name"
             value={name}
             onChange={e => setName(e.target.value)}
             required />
             {errors.name && <span className="error text-danger">{errors.name[0]}</span>}
          </Form.Group>

          <Form.Group controlId="formBasicLastName" className="group">
          <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el primer apellido"
              name="lastName"
              value={last_Name}
              onChange={e => setLast_Name(e.target.value)}
              required
            />
            {errors.last_Name && <span className="error text-danger">{errors.last_Name[0]}</span>}
          </Form.Group>

          <Form.Group controlId="formBasicSecondLastName" className="group">
          <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el segundo apellido"
              name="secondLastName"
              value={second_Last_Name}
              onChange={e => setSecond_Last_Name(e.target.value)}
              required
            />
            {errors.second_Last_Name && <span className="error text-danger">{errors.second_Last_Name[0]}</span>}
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="group">
          <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese la contraseña"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {errors.password && <span className="error text-danger">{errors.password[0]}</span>}
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword" className="group">
          <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirma la contraseña"
              name="passwordConfirmation"
              value={password_confirmation}
              onChange={e => setPassword_Confirmation(e.target.value)}
              required
            />
            {errors.passwordConfirmation && <span className="error text-danger">{errors.passwordConfirmation[0]}</span>}
          </Form.Group>

          <Button variant="primary" type="submit" > 
            Registrar
          </Button>
        </Form>
      </Container>
    </div>
    </div>
  );
}
