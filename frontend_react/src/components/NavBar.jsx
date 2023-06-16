import React from 'react'

import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ModalCreateTicket from './tickets/ModalCreateTicket';
import ModalCreateCategory from './categories/ModalCreateCategory';
import SideBar from './SideBar';


const role = localStorage.getItem('role')
const NavBar = ({getAllCategories = () => {}, getAllTickets = () => {}}) => {
  const location = useLocation();
  return (
    <div>
        <Navbar bg="light" expand="lg">
      <Container fluid>
        <SideBar/>
        
        {location.pathname === '/' ? (
         <Navbar.Brand className='text-info' href="/">Ticket System</Navbar.Brand>
          ) : null}
          {location.pathname === '/categories' ? (
         <Navbar.Brand className='text-info' href="/categories">Categorías</Navbar.Brand>
          ) : null}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          {role === "User" ? (
          <ModalCreateTicket getAllTickets={getAllTickets}/>
          ) : null}
          {role === "Admin" && location.pathname === '/categories' ? (
           <ModalCreateCategory getAllCategories={getAllCategories}/>
          ) : null}
            
        
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
      </div>
  )
}

export default NavBar