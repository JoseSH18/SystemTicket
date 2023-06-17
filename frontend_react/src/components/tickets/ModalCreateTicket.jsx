import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Modal} from 'react-bootstrap';



const endpoint = 'http://localhost:8000/api'
const ModalCreateTicket = ({getAllTickets}) => {
  const [errors, setErrors] = useState({});
    const [title, setTitle] = useState('')
    const [text_Description, setText_Description] = useState('')
    const [id_Priority, setId_Priority] = useState(0)
    const [id_Status, setId_Status] = useState(0)
    const [ids_Categories, setIds_Cateogories] = useState([]);
    const [ids_Tags, setIds_Tags] = useState([]);

    const [files, setFiles] = useState([]);


    const handleFileChange = (event) => {
      const fileList = event.target.files;
      setFiles([...files, ...fileList]);
    };
    const navigate = useNavigate()

    const [priorities, setPriorities] = useState([])
    const [statuses, setStatuses] = useState([])
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
  
    const getAllPriorities = async () =>{
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${endpoint}/ticket/priorities`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPriorities(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    const getAllCategories = async () =>{
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${endpoint}/categories/index`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    const getAllTags= async () =>{
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${endpoint}/ticket/tags`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTags(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  
    const getAllStatuses = async () =>{
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${endpoint}/ticket/statuses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatuses(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    useEffect ( ()=>{
        getAllPriorities();
        getAllStatuses();
        getAllCategories();
        getAllTags();
    }, [])
  
  const store = async (e) =>{
    const token = localStorage.getItem('token');
    e.preventDefault()
    const formData = new FormData();
    files.forEach((file) => formData.append('file[]', file));
    ids_Categories.forEach((categoryId) => formData.append('ids_Categories[]', categoryId));
    ids_Tags.forEach((tagId) => formData.append('ids_Tags[]', tagId));
    formData.append('title', title); 
    formData.append('text_Description', text_Description);
    formData.append('id_Priority', id_Priority); 
    formData.append('id_Status', id_Status); 
  
    await axios.post(`${endpoint}/ticket/store`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      closeModal();
      getAllTickets()
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
    setFiles([]);
    setTitle('');
    setText_Description('');
    setId_Priority(0);
    setId_Status(0);
    setIds_Cateogories([]);
    setIds_Tags([]);
    navigate('/')
  };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Crear Ticket
    </Button>

    <Modal show={show} onHide={handleClose}>
    <Form onSubmit={store}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
  <Form.Group controlId="formText">
    <Form.Label>Título</Form.Label>
    <Form.Control
      type="text"
      value={title}
      onChange={e => setTitle(e.target.value)}
      required
    />
     {errors.title && <span className="error text-danger">{errors.title[0]}</span>}
  </Form.Group>
  <Form.Group controlId="formPriority">
    <Form.Label>Selecciona una prioridad</Form.Label>
    <Form.Control as="select" value={id_Priority} onChange={e => setId_Priority(e.target.value)} required >
      <option value="">Seleccionar</option>
      {priorities.map(priority => (
        <option key={priority.id} value={priority.id}>
          {priority.type}
        </option>
      ))}
       {errors.id_Priority && <span className="error text-danger">{errors.id_Priority[0]}</span>}
    </Form.Control>
  </Form.Group>

  <Form.Group controlId="formStatus">
    <Form.Label>Selecciona un estado</Form.Label>
    <Form.Control as="select" value={id_Status} onChange={e => setId_Status(e.target.value)} required >
      <option value="">Seleccionar</option>
      {statuses.map(status => (
        <option key={status.id} value={status.id}>
          {status.status}
        </option>
      ))}
       {errors.id_Status && <span className="error text-danger">{errors.id_Status[0]}</span>}
    </Form.Control>
  </Form.Group>

  <Form.Group controlId="formDescription">
    <Form.Label>Descripción</Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      value={text_Description}
      onChange={e => setText_Description(e.target.value)}
      required 
    />
     {errors.text_Description && <span className="error text-danger">{errors.text_Description[0]}</span>}
  </Form.Group>
  <Form.Group controlId="formFile">
        <Form.Label>Seleccionar archivo</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileChange}  />
        {errors.file && <span className="error text-danger">{errors.file[0]}</span>}
</Form.Group>
<Form.Group controlId="formCategory">
  <Form.Label>Selecciona una o más categorías</Form.Label>
  <Form.Control as="select" multiple value={ids_Categories} onChange={e => setIds_Cateogories(Array.from(e.target.selectedOptions, option => option.value))} required>
    {categories.map(category => (
      <option key={category.id} value={category.id}>
        {category.category}
      </option>
    ))}
     {errors.ids_Categories && <span className="error text-danger">{errors.ids_Categories[0]}</span>}
  </Form.Control>
</Form.Group>
<Form.Group controlId="formTag">
  <Form.Label>Selecciona una o más etiquetas</Form.Label>
  <Form.Control as="select" multiple value={ids_Tags} onChange={e => setIds_Tags(Array.from(e.target.selectedOptions, option => option.value))} required>
    {tags.map(tag => (
      <option key={tag.id} value={tag.id}>
        {tag.tag}
      </option>
    ))}
     {errors.ids_Tags && <span className="error text-danger">{errors.ids_Tags[0]}</span>}
  </Form.Control>
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

export default ModalCreateTicket