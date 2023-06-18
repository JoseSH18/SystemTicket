import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Modal, Card} from 'react-bootstrap';



const role = localStorage.getItem('role')
const endpoint = 'http://localhost:8000/api'
const ModalEditTicket = ({EditObjects}) => {
  const [errors, setErrors] = useState({});
  const { id, getAllTickets } = EditObjects;
    const [title, setTitle] = useState('')
    const [text_Description, setText_Description] = useState('')
    const [id_Priority, setId_Priority] = useState(0)
    const [id_Status, setId_Status] = useState(0)
    const [ids_Categories, setIds_Cateogories] = useState([]);
    const [ids_Tags, setIds_Tags] = useState([]);
    const [files, setFiles] = useState([]);
    const [oldFiles, setOldFiles] = useState([]);
    const [id_Agent, setId_Agent] = useState('')
    const [agents, setAgents] = useState([])

    const removeFile = (fileId) => {
      setOldFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    };
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
        const response = await axios.get(`${endpoint}/priorities/index`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPriorities(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    const getAllAgents = async () =>{
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${endpoint}/ticket/agents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAgents(response.data)
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
        const response = await axios.get(`${endpoint}/tags/index`, {
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
        const response = await axios.get(`${endpoint}/statuses/index`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatuses(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    const getTicketById = async () =>{
      const token = localStorage.getItem('token');
      const response = await axios.get(`${endpoint}/ticket/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setTitle(response.data.title)
      setText_Description(response.data.text_Description)
      setId_Priority(response.data.id_Priority)
      setId_Status(response.data.id_Status)
      setIds_Cateogories(response.data.categories.map(category => category.id))
      setIds_Tags(response.data.tags.map(tag => tag.id))
      setOldFiles(response.data.files)

  }
    useEffect( () =>{
        getAllPriorities();
        getAllStatuses();
        getAllCategories();
        getAllTags();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  const update = async (e) =>{
    const token = localStorage.getItem('token');
    e.preventDefault()
    const formData = new FormData();
    files.forEach((file) => formData.append('file[]', file));
    ids_Categories.forEach((categoryId) => formData.append('ids_Categories[]', categoryId));
    ids_Tags.forEach((tagId) => formData.append('ids_Tags[]', tagId));
    oldFiles.forEach((oldfile) => formData.append('oldFiles[]', oldfile.id));
    formData.append('title', title); 
    formData.append('text_Description', text_Description);
    formData.append('id_Priority', id_Priority); 
    formData.append('id_Status', id_Status); 
    formData.append('id_Agent', id_Agent);
    await axios.post(`${endpoint}/ticket/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      getAllTickets();
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
    setFiles([]);
    setTitle('');
    setText_Description('');
    setId_Priority(0);
    setId_Status(0);
    setIds_Cateogories([]);
    setIds_Tags([]);
    setOldFiles([]);
    navigate('/')
  };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="link" className="dropdown-item" onClick={() => {
  getTicketById(id);
  handleShow();
  if(role === 'Admin'){
    getAllAgents();
  }
 }}>
      Editar
    </Button>

    <Modal show={show} onHide={handleClose}>
    <Form onSubmit={update}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Ticket</Modal.Title>
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
  {oldFiles.map((file) => (
      <Card key={file.id} className="mb-3">
    <Card.Body>
      <Card.Link href={`http://127.0.0.1:8000/storage/${file.file}`} target="_blank" rel="noopener noreferrer">
        Ver archivo
      </Card.Link>
      <Button variant="danger" onClick={() => removeFile(file.id)}>
        Eliminar
      </Button>
    </Card.Body>
  </Card>
    ))}
  <Form.Group controlId="formFile">
        <Form.Label>Seleccionar archivo</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileChange}  />
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
    {errors.setIds_Tags && <span className="error text-danger">{errors.setIds_Tags[0]}</span>}
  </Form.Control>
</Form.Group>
{role === "Admin" ? (        
<Form.Group controlId="formAgent">
    <Form.Label>Selecciona un agente</Form.Label>
    <Form.Control as="select" value={id_Agent} onChange={e => setId_Agent(e.target.value)}>
      <option value={0}>Seleccionar</option>
      {agents.map(agent => (
        <option key={agent.id} value={agent.id}>
        {agent.name} {agent.last_Name} {agent.second_Last_Name}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
) : null}
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

export default ModalEditTicket