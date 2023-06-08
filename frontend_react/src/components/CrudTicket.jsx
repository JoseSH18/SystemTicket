import React from 'react'
import Table from 'react-bootstrap/Table';
import NavBar from './NavBar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ModalAssignTicket from './ModalAssignTicket';
import ModalEditTicket from './ModalEditTicket';


import {useEffect, useState} from 'react'
import axios from 'axios'

const endpoint = 'http://localhost:8000/api'
const role = localStorage.getItem('role')
const CrudTicket = () => {
  const [tickets, setTickets] = useState([])
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // Categoría seleccionada para filtrar
  useEffect ( ()=>{
    getAllTickets()
    getAllCategories()
    getAllStatuses()
  getAllPriorities()
  }, [])

  const getAllTickets = async () =>{
    try {
      const token = localStorage.getItem('token');
     
      const response = await axios.get(`${endpoint}/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTickets(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  const getAllCategories = async () =>{
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${endpoint}/ticket/categories`, {
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  
  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  // Filtrar los tickets por categoría seleccionada
  const filteredTickets =
  (selectedStatus || selectedPriority || selectedCategory)
    ? tickets.filter((ticket) => {
        const statusMatch = selectedStatus ? ticket.status.status === selectedStatus : true;
        const priorityMatch = selectedPriority ? ticket.priority.type === selectedPriority : true;
        const categoryMatch = selectedCategory
          ? ticket.categories.some((category) => category.category === selectedCategory)
          : true;
          
        return statusMatch && priorityMatch && categoryMatch;
      })
    : tickets;
  
  return (
    <div>   
<NavBar getAllTickets={getAllTickets}/>

    <Table striped bordered hover size="sm">
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
                               <NavDropdown.Item href="#action3"><ModalEditTicket id={ticket.id}/></NavDropdown.Item>
                              ) : null}
                            <NavDropdown.Item href="#action5">
                              Detalle
                            </NavDropdown.Item>
                            {role === "Admin" ? (
                                <NavDropdown.Item href="#action4">
                                  Eliminar
                                </NavDropdown.Item>
                              ) : null}
                          </NavDropdown>
                          </td>
                      </tr>  
      ) )}
    </tbody>
  </Table>

  </div>
  )
}

export default CrudTicket