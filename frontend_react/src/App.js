
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CrudTicket from './components/CrudTicket'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<CrudTicket/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
