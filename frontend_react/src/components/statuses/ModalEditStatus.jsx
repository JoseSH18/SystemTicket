import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Modal} from 'react-bootstrap';



const endpoint = 'http://localhost:8000/api'
const ModalEditStatus = ({EditObjects}) => {
  const [errors, setErrors] = useState({});
    const { id, getAllStatuses } = EditObjects;
    const [status, setStatus] = useState('')

    const navigate = useNavigate()

    const getStatusById = async () =>{
        const token = localStorage.getItem('token');
        const response = await axios.get(`${endpoint}/status/get/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setStatus(response.data.status)
    }
    useEffect( () =>{
        
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  const update = async (e) =>{
    const token = localStorage.getItem('token');
    e.preventDefault()
    const formData = new FormData();
    formData.append('status', status); 

    await axios.post(`${endpoint}/status/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      getAllStatuses();
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
    setStatus('');
    navigate('/statuses')
  };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="link" className="dropdown-item" onClick={() => {
  getStatusById(id);
  handleShow();}}>
      Editar
    </Button>

    <Modal show={show} onHide={handleClose}>
    <Form onSubmit={update}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Estado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
  <Form.Group controlId="formStatus">
    <Form.Label>Nombre del Estado</Form.Label>
    <Form.Control
      type="text"
      value={status}
      onChange={e => setStatus(e.target.value)}
      required
    />
     {errors.status && <span className="error text-danger">{errors.status[0]}</span>}
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

export default ModalEditStatus