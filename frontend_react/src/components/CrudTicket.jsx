import React from 'react'
import Table from 'react-bootstrap/Table';
import SideBarNavBar from './SideBar_NavBar';


import {useEffect, useState} from 'react'
import axios from 'axios'

const endpoint = 'http://localhost:8000/api'
const CrudTicket = () => {
  const [tickets, setTickets] = useState([])
  useEffect ( ()=>{
    getAllTickets()
  }, [])

  const getAllTickets = async () =>{
    try {
      const response = await axios.get(`${endpoint}/tickets`)
      setTickets(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>   
<SideBarNavBar getAllTickets={getAllTickets}/>

    <Table striped bordered hover responsive size="sm">
    <thead>
      <tr>
        <th>Description</th>
        <th>Priority</th>
        <th>Status</th>
        <th>Agent</th>
        <th>User</th>
      </tr>
    </thead>
    <tbody>
    { tickets.map( (ticket)=>(
                      <tr key={ticket.id}>
                          <td>{ticket.text_Description}</td>   
                          <td>{ticket.priority.type}</td>   
                          <td>{ticket.status.status}</td>
                          <td>{ticket.agent ? ticket.agent.name : <span style={{ color: 'red' }}>Sin Asignar</span>}</td>
                          <td>{ticket.user.name}</td>
                      </tr>  
      ) )}
    </tbody>
  </Table>
  </div>
  )
}

export default CrudTicket