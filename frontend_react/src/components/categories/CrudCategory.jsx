import React from 'react'
import {Table, Modal, Button} from 'react-bootstrap';
import NavBar from '../NavBar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Loading from '../loading';
import ModalEditCategory from './ModalEditCategory';

import {useEffect, useState} from 'react'
import axios from 'axios'

const endpoint = 'http://localhost:8000/api'
const role = localStorage.getItem('role')
const CrudCategory = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [idCategory, setIdCategory] = useState('')

  useEffect ( ()=>{
    getAllCategories()
  }, [])

  const getAllCategories = async () =>{
    setIsLoading(true)
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${endpoint}/categories/index`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  const confirmDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${endpoint}/category/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setShowConfirmation(false);
    getAllCategories();
  };
  const handleDelete = () => {
    setShowConfirmation(true);
  };
  const handleClose = () => {
    setShowConfirmation(false);
  };

    if (isLoading) {
      
      return(
      <>
  <NavBar getAllCategories={getAllCategories} />
  <Loading />
</>
)
      }
      else if(!isLoading && categories.length === 0 ){
        return(
          <>
      <NavBar getAllCategories={getAllCategories} />
      <h3 className='text-success'>No se encontraron categorias registradas</h3>
    </>
        )
      }
  return (
    <div>   
<NavBar getAllCategories={getAllCategories}/>

    <Table striped bordered hover size="sm" style={{ overflowX: 'auto', maxHeight: '100%' }}>
    <thead>
      <tr>
        <th>Id</th>
        <th>Nombre de Categoría</th>
      </tr>
    </thead>
    <tbody>
    {categories.map((category) => (
                      <tr key={category.id}>
                          <td>{category.id}</td>   
                          <td>{category.category}</td>   
                          <td>
                          <NavDropdown title={<i className="fa-solid fa-ellipsis-vertical"></i>} id="navbarScrollingDropdown">
                            
                              {role === "Admin" ? (
                             <NavDropdown.Item href="#action3"><ModalEditCategory EditObjects={{id: category.id, getAllCategories: getAllCategories}}/></NavDropdown.Item>
                              ) : null}
                            {role === "Admin" ? (
                                <NavDropdown.Item href="#action4">
                                  <button onClick={() => {setIdCategory(category.id);handleDelete();}} variant="link" className="dropdown-item">Eliminar</button>

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
      <Modal.Title>¿Estás seguro de que deseas eliminar esta categoría?</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
    <Button variant="outline-success" onClick={()=>confirmDelete(idCategory)}>Sí</Button>
    <Button variant="outline-danger" onClick={() => setShowConfirmation(false)}>Cancelar</Button>
    </Modal.Footer>

  </Modal>
)}
  </div>
  )
}

export default CrudCategory