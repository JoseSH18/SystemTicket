import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Modal} from 'react-bootstrap';



const endpoint = 'http://localhost:8000/api'
const ModalEditCategory = ({EditObjects}) => {
    const { id, getAllCategories } = EditObjects;
    const [category, setCategory] = useState('')

    const navigate = useNavigate()

    const getCategoryById = async () =>{
        const token = localStorage.getItem('token');
        const response = await axios.get(`${endpoint}/category/get/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCategory(response.data.category)
    }
    useEffect( () =>{
        
        getCategoryById()

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  const update = async (e) =>{
    const token = localStorage.getItem('token');
    e.preventDefault()
    const formData = new FormData();
    formData.append('category', category); 

    await axios.post(`${endpoint}/category/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
      }
    });
    handleClose();
    getAllCategories();
    setCategory('');
    navigate('/categories')

  }
 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="link" className="dropdown-item" onClick={() => {
  getCategoryById(id);
  handleShow();}}>
      Editar
    </Button>

    <Modal show={show} onHide={handleClose}>
    <Form onSubmit={update}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
  <Form.Group controlId="formCategory">
    <Form.Label>Nombre de Categoría</Form.Label>
    <Form.Control
      type="text"
      value={category}
      onChange={e => setCategory(e.target.value)}
      required
    />
  </Form.Group>
</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
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

export default ModalEditCategory