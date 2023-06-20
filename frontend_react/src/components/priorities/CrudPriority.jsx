import React from 'react'
import {Table, Modal, Button} from 'react-bootstrap';
import NavBar from '../NavBar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Loading from '../loading';
import ModalEditPriority from './ModalEditPriority';

import {useEffect, useState} from 'react'
import axios from 'axios'

const endpoint = 'http://localhost:8000/api'
const role = localStorage.getItem('role')
const CrudPriority = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [priorities, setPriorities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [idPriority, setIdPriority] = useState('')
  const [searchPriority, setSearchPriority] = useState('');
  useEffect ( ()=>{
    getAllPriorities()
  }, [])

  const getAllPriorities = async () =>{
    setIsLoading(true)
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${endpoint}/priorities/index`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPriorities(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  const confirmDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${endpoint}/priority/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setShowConfirmation(false);
    getAllPriorities();
  };
  const handleDelete = () => {
    setShowConfirmation(true);
  };
  const handleClose = () => {
    setShowConfirmation(false);
  };
  const handlePriorityChange = (event) => {
    setSearchPriority(event.target.value);
  };
  const filteredPriorities =
  (searchPriority)
    ? priorities.filter((priority) => {
        const priorityMatch = searchPriority ? priority.type.toLowerCase().includes(searchPriority.toLowerCase()) : true;    
        return  priorityMatch;
      })
    : priorities;
    if (isLoading) {
      
      return(
      <>
  <NavBar NavBarItemsPriorities={{getAllPriorities, handlePriorityChange, searchPriority}} />
  <Loading />
</>
)
      }
      else if(!isLoading && priorities.length === 0 ){
        return(
          <>
  <NavBar NavBarItemsPriorities={{getAllPriorities, handlePriorityChange, searchPriority}} />
      <h3 className='text-success'>No se encontraron prioridades registradas</h3>
    </>
        )
      }
  return (
    <div>   
  <NavBar NavBarItemsPriorities={{getAllPriorities, handlePriorityChange, searchPriority}} />
  <div className="table-responsive" style={{minHeight: '50vh'}}>
    <Table striped bordered hover size="sm" style={{ overflowX: 'auto', maxHeight: '100%' }}>
    <thead>
      <tr>
        <th>Id</th>
        <th>Tipo de Prioridad</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
    {filteredPriorities.map((priority) => (
                      <tr key={priority.id}>
                          <td>{priority.id}</td>   
                          <td>{priority.type}</td>   
                          <td>
                          <NavDropdown title={<i className="fa-solid fa-ellipsis-vertical"></i>} id="navbarScrollingDropdown">
                            
                              {role === "Admin" ? (
                             <NavDropdown.Item href="#action3"><ModalEditPriority EditObjects={{id: priority.id, getAllPriorities: getAllPriorities}}/></NavDropdown.Item>
                              ) : null}
                            {role === "Admin" ? (
                                <NavDropdown.Item href="#action4">
                                  <button onClick={() => {setIdPriority(priority.id);handleDelete();}} variant="link" className="dropdown-item">Eliminar</button>

                                </NavDropdown.Item>
                                
                              ) : null}
                          </NavDropdown>

                          </td>
                          
                      </tr>  
      ) )}
    </tbody>
  </Table>
  </div>
  {showConfirmation && (
  <Modal show={setShowConfirmation} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>¿Estás seguro de que deseas eliminar esta prioridad?</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
    <Button variant="outline-success" onClick={()=>confirmDelete(idPriority)}>Sí</Button>
    <Button variant="outline-danger" onClick={() => setShowConfirmation(false)}>Cancelar</Button>
    </Modal.Footer>

  </Modal>
)}
  </div>
  )
}

export default CrudPriority