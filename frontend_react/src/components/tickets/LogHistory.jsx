import React from 'react'
import {Table} from 'react-bootstrap';
import NavBar from '../NavBar';
import Loading from '../loading';


import {useEffect, useState} from 'react'
import axios from 'axios'

const endpoint = 'http://localhost:8000/api'
const LogHistory = () => {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchLog, setSearchLog] = useState('');
  useEffect ( ()=>{
    getAllLogs()
  }, [])

  const getAllLogs = async () =>{
    setIsLoading(true)
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${endpoint}/ticket/logs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogs(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }


  const handleLogChange = (event) => {
    setSearchLog(event.target.value);
  };
  const filteredLogs =
  (searchLog)
    ? logs.filter((log) => {
        const tagMatch = searchLog ? log.message.toLowerCase().includes(searchLog.toLowerCase()) : true;    
        return  tagMatch;
      })
    : logs;
    if (isLoading) {
      
      return(
      <>
  <NavBar NavBarItemsLogs={{ handleLogChange, searchLog}} />
  <Loading />
</>
)
      }
      else if(!isLoading && logs.length === 0 ){
        return(
          <>
  <NavBar NavBarItemsLogs={{ handleLogChange, searchLog}} />
      <h3 className='text-success'>No se encontraron logs registrados</h3>
    </>
        )
      }
  return (
    <div>   
  <NavBar NavBarItemsLogs={{ handleLogChange, searchLog}} />
  <div className="table-responsive" style={{minHeight: '50vh'}}>
    <Table striped bordered hover size="sm" style={{ overflowX: 'auto', maxHeight: '100%' }}>
    <thead>
      <tr>
        <th>Id</th>
        <th>Mensaje del Log</th>
      </tr>
    </thead>
    <tbody>
    {filteredLogs.map((log) => (
                      <tr key={log.id}>
                          <td>{log.id}</td>   
                          <td>{log.message} el día {log.created_at}</td>   
                      </tr>  
      ) )}
    </tbody>
  </Table>
  </div>
  </div>
  )
}

export default LogHistory