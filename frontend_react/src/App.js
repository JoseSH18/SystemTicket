import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CrudTicket from './components/CrudTicket.jsx';
import { FormRegister } from './components/FormRegister';
import FormLogin from './components/FormLogin';
import TicketDetail from './components/TicketDetail';
import axios from 'axios';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  const role = localStorage.getItem('role'); 

  if (isAuthenticated && (role === 'User' || role === 'Agent')) {
    return <Element {...rest} />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const endpoint = 'http://localhost:8000/api/is-authenticated';
    const token = localStorage.getItem('token');
    
    if (token) {
      axios
        .get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {

          setIsAuthChecked(true);
        })
        .catch((error) => {
          console.log('Error al verificar la autenticación:', error);
          setIsAuthChecked(true);
           localStorage.removeItem('token')
           localStorage.removeItem('role')
           alert('El token es inválido');
           <Navigate to="/login" replace />;
           window.location.reload();
        });
    } else {
      setIsAuthChecked(true);
       localStorage.removeItem('token')
       localStorage.removeItem('role')
    }
  }, []);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Verificar si el evento beforeunload se debe al cierre de la aplicación
      if (event.clientY < 0) {
        localStorage.removeItem('token'); // Eliminar el token del localStorage al cerrar la aplicación
        localStorage.removeItem('role')
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (!isAuthChecked) {
    return null; // Renderizar un estado de carga o un componente de carga aquí si lo deseas
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<FormLogin />} />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/" element={<PrivateRoute element={CrudTicket} />} />
          <Route path="/detail/:id" element={<PrivateRoute element={TicketDetail} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;