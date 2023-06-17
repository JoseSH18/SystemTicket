import React from 'react'
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ModalCreateTicket from './tickets/ModalCreateTicket';
import ModalCreateCategory from './categories/ModalCreateCategory';
import SideBar from './SideBar';
import {Link} from 'react-router-dom'

const role = localStorage.getItem('role')
const NavBar = ({NavBarItemsCategories = {}, NavBarItemsTickets = {}}) => {
  const { getAllTickets, handleTicketTitleChange, searchTicket } = NavBarItemsTickets;
  const { getAllCategories, handleCategoryChange, searchCategory } = NavBarItemsCategories;
  const location = useLocation();
  return (
    <div>
        <Navbar bg="light" expand="lg">
      <Container fluid>
        <SideBar/>
        
        {location.pathname === '/' && role !== 'Admin'? (
         <Navbar.Brand className='text-info' href="/">Ticket System</Navbar.Brand>
          ) : null}
          {location.pathname === '/' && role === 'Admin'? (
         <Navbar.Brand className='text-info' href="/">Ticket System Dashboard</Navbar.Brand>
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
             
          {role === "User" && /^\/detail\/\d+$/.test(location.pathname)? (
          <Link to={`/`} variant="link" style={{ width: '90px' }} className='d-flex btn btn-outline-info'>&larr; Home</Link>
          ) : null}
          {role === "User" && location.pathname === '/'? (
          <ModalCreateTicket getAllTickets={getAllTickets}/>
          ) : null}
          {role === "Admin" && location.pathname === '/categories' ? (
           <ModalCreateCategory getAllCategories={getAllCategories}/>
          ) : null}
            
        
          </Nav>
          { location.pathname === '/'? (
         <Form className="d-flex">
         <Form.Control
           type="search"
           placeholder="Search"
           className="me-2"
           aria-label="Search"
           value={searchTicket}
           onChange={handleTicketTitleChange}
         />
       </Form>
          ) : null}
          
          {role === "Admin" && location.pathname === '/categories' ? (
          <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchCategory}
            onChange={handleCategoryChange}
          />
        </Form>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
      </div>
  )
}

export default NavBar