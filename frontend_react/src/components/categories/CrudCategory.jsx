import React from 'react'
import Table from 'react-bootstrap/Table';
import NavBar from '../NavBar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Loading from '../loading';
import ModalEditCategory from './ModalEditCategory';

import {useEffect, useState} from 'react'
import axios from 'axios'

const endpoint = 'http://localhost:8000/api'
const role = localStorage.getItem('role')
const CrudCategory = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
  const deleteCategory= async (id) =>{
    const token = localStorage.getItem('token');
    await axios.delete(`${endpoint}/category/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getAllCategories()
  }



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
                                  <button onClick={()=>deleteCategory(category.id)} variant="link" className="dropdown-item">Eliminar</button>
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

export default CrudCategory