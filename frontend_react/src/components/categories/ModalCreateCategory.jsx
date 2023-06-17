import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Modal} from 'react-bootstrap';



const endpoint = 'http://localhost:8000/api'
const ModalCreateCategory = ({getAllCategories}) => {

    const [category, setCategory] = useState('')
    const [errors, setErrors] = useState({});

    const navigate = useNavigate()


  
    

    
  
    

    useEffect ( ()=>{
        
    }, [])
  
  const store = async (e) =>{
    const token = localStorage.getItem('token');
    e.preventDefault()
    const formData = new FormData();
    formData.append('category', category); 
  
    await axios.post(`${endpoint}/category/store`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      getAllCategories();
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
    setCategory('');
    navigate('/categories')
  };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Crear Categoría
    </Button>

    <Modal show={show} onHide={handleClose}>
    <Form onSubmit={store}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
  <Form.Group controlId="formText">
    <Form.Label>Nombre de categoría</Form.Label>
    <Form.Control
      type="text"
      value={category}
      onChange={e => setCategory(e.target.value)}
      required
    />
     {errors.category && <span className="error text-danger">{errors.category[0]}</span>}
  </Form.Group>
</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
        <Button variant="primary" type="submit" >
            Crear
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>

  </>
  )
}

export default ModalCreateCategory