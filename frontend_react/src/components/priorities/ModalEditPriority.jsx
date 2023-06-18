import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Modal} from 'react-bootstrap';



const endpoint = 'http://localhost:8000/api'
const ModalEditPriority = ({EditObjects}) => {
  const [errors, setErrors] = useState({});
    const { id, getAllPriorities } = EditObjects;
    const [type, setType] = useState('')

    const navigate = useNavigate()

    const getPriorityById = async () =>{
        const token = localStorage.getItem('token');
        const response = await axios.get(`${endpoint}/priority/get/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setType(response.data.type)
    }
    useEffect( () =>{
        
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  const update = async (e) =>{
    const token = localStorage.getItem('token');
    e.preventDefault()
    const formData = new FormData();
    formData.append('type', type); 

    await axios.post(`${endpoint}/priority/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      getAllPriorities();
      closeModal();
    }).catch(error => {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        setErrors(errors);
      } else {
        // Manejo de otros tipos de errores
      }
    });

  }
  const closeModal = () => {
    handleClose();
    setType('');
    navigate('/priorities')
  };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="link" className="dropdown-item" onClick={() => {
  getPriorityById(id);
  handleShow();}}>
      Editar
    </Button>

    <Modal show={show} onHide={handleClose}>
    <Form onSubmit={update}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Prioridad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
  <Form.Group controlId="formtag">
    <Form.Label>Tipo de Prioridad</Form.Label>
    <Form.Control
      type="text"
      value={type}
      onChange={e => setType(e.target.value)}
      required
    />
     {errors.type && <span className="error text-danger">{errors.type[0]}</span>}
  </Form.Group>
</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
        <Button variant="primary" type="submit" >
            Editar
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>

  </>
  )
}

export default ModalEditPriority