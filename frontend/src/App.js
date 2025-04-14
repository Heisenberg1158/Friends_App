import { useState } from 'react';
import {  Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './components/Homepage';
import Landingpage from './components/Landingpage';
import Loginpage from './components/Loginpage';
import Registerpage from './components/Registerpage';


export const BASE_URL = 'http://127.0.0.1:5000';

function App() {
  const [users, setUsers] = useState([]);
  const location = useLocation(); // Get the current route

  return (
    <div>
      {location.pathname !== "/Homepage" && ( // Conditionally render outer divs
        <div className="vh-100 gradient-custom">
          <div className="container">
            <h1 className="page-header text-center">
              
            </h1>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/Homepage" element={<Homepage users={users} setUsers={setUsers} />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
      </Routes>
    </div>
  );
}

export default App;
