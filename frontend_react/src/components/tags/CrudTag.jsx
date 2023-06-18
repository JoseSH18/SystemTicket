import React from 'react'
import {Table, Modal, Button} from 'react-bootstrap';
import NavBar from '../NavBar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Loading from '../loading';
import ModalEditTag from './ModalEditTag';

import {useEffect, useState} from 'react'
import axios from 'axios'

const endpoint = 'http://localhost:8000/api'
const role = localStorage.getItem('role')
const CrudTag = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [idTag, setIdTag] = useState('')
  const [searchTag, setSearchTag] = useState('');
  useEffect ( ()=>{
    getAllTags()
  }, [])

  const getAllTags = async () =>{
    setIsLoading(true)
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${endpoint}/tags/index`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTags(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  const confirmDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${endpoint}/tag/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setShowConfirmation(false);
    getAllTags();
  };
  const handleDelete = () => {
    setShowConfirmation(true);
  };
  const handleClose = () => {
    setShowConfirmation(false);
  };
  const handleTagChange = (event) => {
    setSearchTag(event.target.value);
  };
  const filteredTags =
  (searchTag)
    ? tags.filter((tag) => {
        const tagMatch = searchTag ? tag.tag.toLowerCase().includes(searchTag.toLowerCase()) : true;    
        return  tagMatch;
      })
    : tags;
    if (isLoading) {
      
      return(
      <>
  <NavBar NavBarItemsTags={{getAllTags, handleTagChange, searchTag}} />
  <Loading />
</>
)
      }
      else if(!isLoading && tags.length === 0 ){
        return(
          <>
  <NavBar NavBarItemsTags={{getAllTags, handleTagChange, searchTag}} />
      <h3 className='text-success'>No se encontraron etiquetas registradas</h3>
    </>
        )
      }
  return (
    <div>   
  <NavBar NavBarItemsTags={{getAllTags, handleTagChange, searchTag}} />
  <div className="table-responsive">
    <Table striped bordered hover size="sm" style={{ overflowX: 'auto', maxHeight: '100%' }}>
    <thead>
      <tr>
        <th>Id</th>
        <th>Nombre de Etiqueta</th>
      </tr>
    </thead>
    <tbody>
    {filteredTags.map((tag) => (
                      <tr key={tag.id}>
                          <td>{tag.id}</td>   
                          <td>{tag.tag}</td>   
                          <td>
                          <NavDropdown title={<i className="fa-solid fa-ellipsis-vertical"></i>} id="navbarScrollingDropdown">
                            
                              {role === "Admin" ? (
                             <NavDropdown.Item href="#action3"><ModalEditTag EditObjects={{id: tag.id, getAllTags: getAllTags}}/></NavDropdown.Item>
                              ) : null}
                            {role === "Admin" ? (
                                <NavDropdown.Item href="#action4">
                                  <button onClick={() => {setIdTag(tag.id);handleDelete();}} variant="link" className="dropdown-item">Eliminar</button>

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
      <Modal.Title>¿Estás seguro de que deseas eliminar esta etiqueta?</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
    <Button variant="outline-success" onClick={()=>confirmDelete(idTag)}>Sí</Button>
    <Button variant="outline-danger" onClick={() => setShowConfirmation(false)}>Cancelar</Button>
    </Modal.Footer>

  </Modal>
)}
  </div>
  )
}

export default CrudTag