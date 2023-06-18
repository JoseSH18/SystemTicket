import React from 'react'
import {Table, Modal, Button} from 'react-bootstrap';
import NavBar from '../NavBar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Loading from '../loading';
import ModalEditStatus from './ModalEditStatus';

import {useEffect, useState} from 'react'
import axios from 'axios'

const endpoint = 'http://localhost:8000/api'
const role = localStorage.getItem('role')
const CrudStatus = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [statuses, setStatuses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [idStatus, setIdStatus] = useState('')
  const [searchStatus, setSearchStatus] = useState('');
  useEffect ( ()=>{
    getAllStatuses()
  }, [])

  const getAllStatuses = async () =>{
    setIsLoading(true)
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${endpoint}/statuses/index`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatuses(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  const confirmDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${endpoint}/status/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setShowConfirmation(false);
    getAllStatuses();
  };
  const handleDelete = () => {
    setShowConfirmation(true);
  };
  const handleClose = () => {
    setShowConfirmation(false);
  };
  const handleStatusChange = (event) => {
    setSearchStatus(event.target.value);
  };
  const filteredStatuses =
  (searchStatus)
    ? statuses.filter((status) => {
        const statusMatch = searchStatus ? status.status.toLowerCase().includes(searchStatus.toLowerCase()) : true;    
        return  statusMatch;
      })
    : statuses;
    if (isLoading) {
      
      return(
      <>
  <NavBar NavBarItemsStatuses={{getAllStatuses, handleStatusChange, searchStatus}} />
  <Loading />
</>
)
      }
      else if(!isLoading && statuses.length === 0 ){
        return(
          <>
  <NavBar NavBarItemsStatuses={{getAllStatuses, handleStatusChange, searchStatus}} />
      <h3 className='text-success'>No se encontraron estados registrados</h3>
    </>
        )
      }
  return (
    <div>   
  <NavBar NavBarItemsStatuses={{getAllStatuses, handleStatusChange, searchStatus}} />
  <div className="table-responsive" style={{minHeight: '50vh'}}>
    <Table striped bordered hover size="sm" style={{ overflowX: 'auto', maxHeight: '100%' }}>
    <thead>
      <tr>
        <th>Id</th>
        <th>Nombre del Estado</th>
      </tr>
    </thead>
    <tbody>
    {filteredStatuses.map((status) => (
                      <tr key={status.id}>
                          <td>{status.id}</td>   
                          <td>{status.status}</td>   
                          <td>
                          <NavDropdown title={<i className="fa-solid fa-ellipsis-vertical"></i>} id="navbarScrollingDropdown">
                            
                              {role === "Admin" ? (
                             <NavDropdown.Item href="#action3"><ModalEditStatus EditObjects={{id: status.id, getAllStatuses: getAllStatuses}}/></NavDropdown.Item>
                              ) : null}
                            {role === "Admin" ? (
                                <NavDropdown.Item href="#action4">
                                  <button onClick={() => {setIdStatus(status.id);handleDelete();}} variant="link" className="dropdown-item">Eliminar</button>

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
      <Modal.Title>¿Estás seguro de que deseas eliminar este estado?</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
    <Button variant="outline-success" onClick={()=>confirmDelete(idStatus)}>Sí</Button>
    <Button variant="outline-danger" onClick={() => setShowConfirmation(false)}>Cancelar</Button>
    </Modal.Footer>

  </Modal>
)}
  </div>
  )
}

export default CrudStatus