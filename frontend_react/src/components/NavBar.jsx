import React from 'react'
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ModalCreateTicket from './tickets/ModalCreateTicket';
import ModalCreateCategory from './categories/ModalCreateCategory';
import ModalCreateTag from './tags/ModalCreateTag';
import ModalCreatePriority from './priorities/ModalCreatePriority';
import ModalCreateStatus from './statuses/ModalCreateStatus';
import SideBar from './SideBar';
import {Link} from 'react-router-dom'

const role = localStorage.getItem('role')
const NavBar = ({NavBarItemsCategories = {}, NavBarItemsTickets = {}, NavBarItemsTags = {}, NavBarItemsPriorities = {}, NavBarItemsStatuses = {}}) => {
  const { getAllTickets, handleTicketTitleChange, searchTicket } = NavBarItemsTickets;
  const { getAllCategories, handleCategoryChange, searchCategory } = NavBarItemsCategories;
  const { getAllTags, handleTagChange, searchTag } = NavBarItemsTags;
  const { getAllPriorities, handlePriorityChange, searchPriority } = NavBarItemsPriorities;
  const { getAllStatuses, handleStatusChange, searchStatus } = NavBarItemsStatuses;
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
          {location.pathname === '/tags' ? (
         <Navbar.Brand className='text-info' href="/tags">Etiquetas</Navbar.Brand>
          ) : null}
          {location.pathname === '/priorities' ? (
         <Navbar.Brand className='text-info' href="/priorities">Prioridades</Navbar.Brand>
          ) : null}
          {location.pathname === '/statuses' ? (
         <Navbar.Brand className='text-info' href="/statuses">Estados</Navbar.Brand>
          ) : null}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
             
          {/^\/detail\/\d+$/.test(location.pathname)? (
          <Link to={`/`} variant="link" style={{ width: '90px' }} className='d-flex btn btn-outline-info'>&larr; Home</Link>
          ) : null}
          {role === "User" && location.pathname === '/'? (
          <ModalCreateTicket getAllTickets={getAllTickets}/>
          ) : null}
          {role === "Admin" && location.pathname === '/categories' ? (
           <ModalCreateCategory getAllCategories={getAllCategories}/>
          ) : null}
            {role === "Admin" && location.pathname === '/tags' ? (
           <ModalCreateTag getAllTags={getAllTags}/>
          ) : null}
          {role === "Admin" && location.pathname === '/priorities' ? (
           <ModalCreatePriority getAllPriorities={getAllPriorities}/>
          ) : null}
          {role === "Admin" && location.pathname === '/statuses' ? (
           <ModalCreateStatus getAllStatuses={getAllStatuses}/>
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
          {role === "Admin" && location.pathname === '/tags' ? (
          <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchTag}
            onChange={handleTagChange}
          />
        </Form>
          ) : null}
          {role === "Admin" && location.pathname === '/priorities' ? (
          <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchPriority}
            onChange={handlePriorityChange}
          />
        </Form>
          ) : null}
                    {role === "Admin" && location.pathname === '/statuses' ? (
          <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchStatus}
            onChange={handleStatusChange}
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