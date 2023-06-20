import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CrudTicket from './components/tickets/CrudTicket';
import LogHistory from './components/tickets/LogHistory';
import { FormRegister } from './components/users/FormRegister';
import FormLogin from './components/users/FormLogin';
import FormEditTicket from './components/tickets/FormEditTicket';
import TicketDetail from './components/tickets/TicketDetail';
import CrudCategory from './components/categories/CrudCategory';
import CrudTag from './components/tags/CrudTag';
import CrudPriority from './components/priorities/CrudPriority';
import CrudStatus from './components/statuses/CrudStatus';
import axios from 'axios';


const PrivateRoute = ({ element: Element, adminOnly, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (isAuthenticated) {
    if (adminOnly) {
      if (role === 'Admin') {
        return <Element {...rest} />;
      } else {
        alert('Acceso denegado: se requiere el rol de Admin');
        return <Navigate to="/" replace />;
      }
    } else {
      return <Element {...rest} />;
    }
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
           localStorage.removeItem('role');
           <Navigate to="/login" replace />
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
          <Route path="/ticket/:id" element={<PrivateRoute element={FormEditTicket} />} />
          <Route path="/detail/:id" element={<PrivateRoute element={TicketDetail} />} />

          <Route path="/categories" element={<PrivateRoute element={CrudCategory} adminOnly />} />
          <Route path="/tags" element={<PrivateRoute element={CrudTag} adminOnly />} />
          <Route path="/priorities" element={<PrivateRoute element={CrudPriority} adminOnly />} />
          <Route path="/statuses" element={<PrivateRoute element={CrudStatus} adminOnly />} />
          <Route path="/logs" element={<PrivateRoute element={LogHistory} adminOnly />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;