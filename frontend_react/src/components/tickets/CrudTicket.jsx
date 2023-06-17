import React from 'react'
import {Table, Modal, Button} from 'react-bootstrap';
import NavBar from '../NavBar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ModalAssignTicket from './ModalAssignTicket';
import ModalEditTicket from './ModalEditTicket';
import Loading from '../loading';


import {useEffect, useState} from 'react'
import axios from 'axios'

const endpoint = 'http://localhost:8000/api'
const role = localStorage.getItem('role')
const CrudTicket = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [searchTicket, setSearchTicket] = useState(''); 
  const [idTicket, setIdTicket] = useState('')
  useEffect ( ()=>{
    getAllTickets()
    getAllCategories()
    getAllStatuses()
  getAllPriorities()
  }, [])

  const getAllTickets = async () =>{
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token');
     
      const response = await axios.get(`${endpoint}/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setTickets(response.data)
      setIsLoading(false)
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
  const confirmDelete= async (id) =>{
    const token = localStorage.getItem('token');
    await axios.delete(`${endpoint}/ticket/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setShowConfirmation(false);
    getAllTickets()
  }
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const handleDelete = () => {
    setShowConfirmation(true);
  };
  const handleClose = () => {
    setShowConfirmation(false);
  };
  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };
  const handleTicketTitleChange = (event) => {
    setSearchTicket(event.target.value);
  };
  // Filtrar los tickets por categoría seleccionada
  const filteredTickets =
  (selectedStatus || selectedPriority || selectedCategory || searchTicket)
    ? tickets.filter((ticket) => {
        const statusMatch = selectedStatus ? ticket.status.status === selectedStatus : true;
        const ticketMatch = searchTicket ? ticket.title.toLowerCase().includes(searchTicket.toLowerCase()) : true;
        const priorityMatch = selectedPriority ? ticket.priority.type === selectedPriority : true;
        const categoryMatch = selectedCategory
          ? ticket.categories.some((category) => category.category === selectedCategory)
          : true;
          
        return statusMatch && priorityMatch && categoryMatch && ticketMatch;
      })
    : tickets;
    if (isLoading) {
      
      return(
      <>
  <NavBar NavBarItemsTickets={{getAllTickets, handleTicketTitleChange, searchTicket}} />
  <Loading />
</>
)
      }
      else if(!isLoading && tickets.length === 0 ){
        return(
          <>
      <NavBar NavBarItemsTickets={{getAllTickets, handleTicketTitleChange, searchTicket}} />
      <h3 className='text-success'>No se encontraron tickets registrados</h3>
    </>
        )
      }
  return (
    <div>   
<NavBar NavBarItemsTickets={{getAllTickets, handleTicketTitleChange, searchTicket}}/>

    <Table striped bordered hover size="sm" style={{ overflowX: 'auto', maxHeight: '100%' }}>
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Priority
        <select value={selectedPriority} onChange={handlePriorityChange}>
        <option value="">All Priorities</option>
        {priorities.map((priority) => (
          <option value={priority.type} key={priority.type}>
            {priority.type}
          </option>
        ))}
      </select>
        </th>
        <th>Status
        <select value={selectedStatus} onChange={handleStatusChange}>
        <option value="">All Statuses</option>
        {statuses.map((status) => (
          <option value={status.status} key={status.status}>
            {status.status}
          </option>
        ))}
      </select>
        </th>
        <th>Agent</th>
        <th>User</th>
        <th>Categorías
        <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option value={category.category} key={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
        </th>
        <th>Etiquetas</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {filteredTickets.map((ticket) => (
                      <tr key={ticket.id}>
                          <td>{ticket.title}</td>   
                          <td>{ticket.text_Description}</td>   
                          <td>{ticket.priority.type}</td>   
                          <td>{ticket.status.status}</td>
                          <td>{ticket.agent ? `${ticket.agent.name} ${ticket.agent.last_Name} ${ticket.agent.second_Last_Name}` : <span style={{ color: 'red' }}>Sin Asignar</span>}</td>
                          <td>{ticket.user.name} {ticket.user.last_Name} {ticket.user.second_Last_Name}</td>
                          <td>{ticket.categories.map(category => category.category).join(', ')}</td>
                          <td>{ticket.tags.map(tag => tag.tag).join(', ')}</td>
                          <td>
                          <NavDropdown title={<i className="fa-solid fa-ellipsis-vertical"></i>} id="navbarScrollingDropdown">
                            
                            {role === "Admin" ? (
                               <NavDropdown.Item href="#action3"><ModalAssignTicket AssignObjects={{id: ticket.id, getAllTickets: getAllTickets}}/></NavDropdown.Item>
                              ) : null}
                              {role === "Admin" || role === "Agent" ? (
                               <NavDropdown.Item href="#action3"><ModalEditTicket EditObjects={{id: ticket.id, getAllTickets: getAllTickets}}/></NavDropdown.Item>
                              ) : null}
                              {role === "User" || role === "Agent" ? (
                
                                  <NavDropdown.Item href={`/detail/${ticket.id}`}>Detalle</NavDropdown.Item>

                              ) : null}
                            {role === "Admin" || role === "Agent" ? (
                                <NavDropdown.Item href="#action4">
                                <button onClick={() => {setIdTicket(ticket.id);handleDelete();}} variant="link" className="dropdown-item">Eliminar</button>
                                </NavDropdown.Item>
                              ) : null}
                          </NavDropdown>
                          </td>
                      </tr>  
      ) )}
    </tbody>
  </Table>
  {showConfirmation && (
  <Modal show={setShowConfirmation} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>¿Estás seguro de que deseas eliminar este Ticket?</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
    <Button variant="outline-success" onClick={()=>confirmDelete(idTicket)}>Sí</Button>
    <Button variant="outline-danger" onClick={() => setShowConfirmation(false)}>Cancelar</Button>
    </Modal.Footer>

  </Modal>
)}
  </div>
  )
}

export default CrudTicket