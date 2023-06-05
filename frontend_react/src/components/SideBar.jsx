import React from 'react'
import {Offcanvas, Button} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
    <Button onClick={handleShow} className='d-flex'>
    Launch
  </Button>
    <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Offcanvas</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>

      <Button onClick={logout}>Logout</Button>
    </Offcanvas.Body>
  </Offcanvas>
  </div>
  )
}

export default SideBar