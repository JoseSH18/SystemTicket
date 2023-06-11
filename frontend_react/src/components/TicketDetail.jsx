import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button, Card } from 'react-bootstrap';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/ticket';

const TicketDetail = () => {
  const [comment, setComment] = useState('');
  const [ticket, setTicket] = useState({});
  const { id } = useParams();


  const handleAddComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(
      `${endpoint}/addComment`,
      { id_Ticket: id, comment: comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    const getTicketById = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${endpoint}/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setTicket(response.data);
    };
    const intervalId = setInterval(getTicketById, 5000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => {
      clearInterval(intervalId);
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <Col>
        <Link to={`/`} variant="link" className='d-flex'>Home</Link>
          <h1>Ticket Detail</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <tbody>
              <tr>
                <td>Title:</td>
                <td>{ticket.title}</td>
              </tr>
              <tr>
                <td>Text Description:</td>
                <td>{ticket.text_Description}</td>
              </tr>
              <tr>
                <td>Priority:</td>
                <td>{ticket.priority && ticket.priority.type}</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{ticket.status && ticket.status.status}</td>
              </tr>
              <tr>
                <td>Agent:</td>
                <td>
                  {ticket.agent ? (
                    `${ticket.agent.name} ${ticket.agent.last_Name} ${ticket.agent.second_Last_Name}`
                  ) : (
                    <span style={{ color: 'red' }}>Sin Asignar</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>User:</td>
                <td>
                  {ticket.user && `${ticket.user.name} ${ticket.user.last_Name} ${ticket.user.second_Last_Name}`}
                </td>
              </tr>
              <tr>
                <td>Categories:</td>
                <td>{ticket.categories && ticket.categories.map((category) => category.category).join(', ')}</td>
              </tr>
              <tr>
                <td>Tags:</td>
                <td>{ticket.tags && ticket.tags.map((tag) => tag.tag).join(', ')}</td>
              </tr>
              <tr>
              
                <td>Files:</td>
                {ticket.files && ticket.files.map((file) => (
                <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                <td>
                <Card key={file.id} className="mb-3">
                    <Card.Body>
                    <a href={`http://127.0.0.1:8000/storage/${file.file}`} target="_blank" rel="noopener noreferrer">
                        Ver archivo
                    </a>
                    </Card.Body>
                </Card>
                </td>
                </div>
                 ))}
                
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
      
        <Col>
          <Form onSubmit={handleAddComment}>
            <Form.Group controlId="comment">
              <Form.Label>Add Comment:</Form.Label>
              <Form.Control type="text" value={comment} onChange={e => setComment(e.target.value)} />
            </Form.Group>
            <Button type="submit">Submit Comment</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        
        <Col>
          <h2>Comments</h2>
          <div style={{ overflowY: 'auto', maxHeight: '200px' }}>
          {ticket.comments &&
            ticket.comments.map((comment, index) => (
              <div key={index}>
                <p>{comment.comment}</p>
                <p>Hecho por: {comment.author}</p>
                <hr />
              </div>
            ))}
            </div>
        </Col>
        
      </Row>
     
    </Container>
  );
};

export default TicketDetail;