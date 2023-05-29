
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Modal} from 'react-bootstrap';

const endpoint = 'http://localhost:8000/api/ticket'
const ModalAssignTicket = (props) => {

    const [id_Agent, setId_Agent] = useState('')
    const navigate = useNavigate()

    const [agents, setAgents] = useState([])

    const assign = async (e)=>{
        e.preventDefault()
        await axios.put(`${endpoint}/assign/${props.AssignObjects.id}`, {
            id_Agent: id_Agent
        })
        props.AssignObjects.getAllTickets();
        handleClose();
        navigate('/')
    }

    const getAllAgents = async () =>{
        try {
          const response = await axios.get(`${endpoint}/agents`)
          setAgents(response.data)
        } catch (error) {
          console.error(error)
        }
      }
      useEffect ( ()=>{
        getAllAgents();
    }, [])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  return (
<>
    <Button variant="link" className="dropdown-item" onClick={handleShow}>
      Asignar
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Asignar Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
  <Form.Group controlId="formPriority">
    <Form.Label>Selecciona una prioridad</Form.Label>
    <Form.Control as="select" value={id_Agent} onChange={e => setId_Agent(e.target.value)}>
      <option value={0}>Seleccionar</option>
      {agents.map(agent => (
        <option key={agent.id} value={agent.id}>
          {agent.name}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={assign}>
            Asignar
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default ModalAssignTicket