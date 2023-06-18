import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Modal} from 'react-bootstrap';



const endpoint = 'http://localhost:8000/api'
const ModalEditTag = ({EditObjects}) => {
  const [errors, setErrors] = useState({});
    const { id, getAllTags } = EditObjects;
    const [tag, setTag] = useState('')

    const navigate = useNavigate()

    const getTagById = async () =>{
        const token = localStorage.getItem('token');
        const response = await axios.get(`${endpoint}/tag/get/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTag(response.data.category)
    }
    useEffect( () =>{
        
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  const update = async (e) =>{
    const token = localStorage.getItem('token');
    e.preventDefault()
    const formData = new FormData();
    formData.append('tag', tag); 

    await axios.post(`${endpoint}/tag/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      getAllTags();
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
    setTag('');
    navigate('/tags')
  };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="link" className="dropdown-item" onClick={() => {
  getTagById(id);
  handleShow();}}>
      Editar
    </Button>

    <Modal show={show} onHide={handleClose}>
    <Form onSubmit={update}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Etiqueta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
  <Form.Group controlId="formtag">
    <Form.Label>Nombre de Etiqueta</Form.Label>
    <Form.Control
      type="text"
      value={tag}
      onChange={e => setTag(e.target.value)}
      required
    />
     {errors.tag && <span className="error text-danger">{errors.tag[0]}</span>}
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

export default ModalEditTag