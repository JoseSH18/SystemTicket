import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Modal} from 'react-bootstrap';

const endpoint = 'http://localhost:8000/api/ticket'
const ModalCreateTicket = ({getAllTickets}) => {

    const [text_Description, setText_Description] = useState('')
    const [id_Priority, setId_Priority] = useState(0)
    const [id_Status, setId_Status] = useState(0)
    const navigate = useNavigate()

    const [priorities, setPriorities] = useState([])
    const [statuses, setStatuses] = useState([])
  
    const getAllPriorities = async () =>{
      try {
        const response = await axios.get(`${endpoint}/priorities`)
        setPriorities(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  
    const getAllStatuses = async () =>{
      try {
        const response = await axios.get(`${endpoint}/statuses`)
        setStatuses(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    useEffect ( ()=>{
        getAllPriorities();
        getAllStatuses();
    }, [])
  
  const store = async (e) =>{
    e.preventDefault()
    await axios.post(`${endpoint}/store`, {text_Description: text_Description, id_Priority: id_Priority
        , id_Status: id_Status})
    handleClose();
    getAllTickets();
    navigate('/')
  }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Crear Ticket
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
  <Form.Group controlId="formPriority">
    <Form.Label>Selecciona una prioridad</Form.Label>
    <Form.Control as="select" value={id_Priority} onChange={e => setId_Priority(e.target.value)}>
      <option value={0}>Seleccionar</option>
      {priorities.map(priority => (
        <option key={priority.id} value={priority.id}>
          {priority.type}
        </option>
      ))}
    </Form.Control>
  </Form.Group>

  <Form.Group controlId="formStatus">
    <Form.Label>Selecciona un estado</Form.Label>
    <Form.Control as="select" value={id_Status} onChange={e => setId_Status(e.target.value)}>
      <option value={0}>Seleccionar</option>
      {statuses.map(status => (
        <option key={status.id} value={status.id}>
          {status.status}
        </option>
      ))}
    </Form.Control>
  </Form.Group>

  <Form.Group controlId="formDescription">
    <Form.Label>Descripción</Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      value={text_Description}
      onChange={e => setText_Description(e.target.value)}
    />
  </Form.Group>
</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={store}>
            Crear
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default ModalCreateTicket