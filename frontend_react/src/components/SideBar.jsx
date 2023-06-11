import React from 'react'
import {Offcanvas, Button} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const role = localStorage.getItem('role')
const SideBar = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout = async (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('role');
          try {

            navigate('/login');
          } catch (error) {
            console.error(error);
          }
  };
  return (
    <div>
    <Button onClick={handleShow} className='d-flex me-5' variant="outline-success">
    Menu
  </Button>
    <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>{role}</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>

      <Button variant="outline-danger" onClick={logout}>Logout</Button>
      <Link onClick={handleClose} to={`/`}  className='btn btn-outline-info d-flex mt-2 w-25' >Home</Link>
    </Offcanvas.Body>
  </Offcanvas>
  </div>
  )
}

export default SideBar