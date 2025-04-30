import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  console.log('TOKEN:', token);
  console.log('ROLE:', role);

  
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="left">
        <Link to="/" className="brand">
          <img src="/logo.png" alt="Logo" className="logo" />
          FixTours
        </Link>
      </div>
      <div className="right">
        {!token && (
          <Link to="/login" className="btn">Iniciar sesión</Link>
        )}
        {token && role === 'ADMIN' && (
          <Link to="/register-tour" className="btn">Registrar Tour</Link>
        )}
        {token && role === 'CLIENT' && (
          <Link to="/my-reservations" className="btn">Mis reservas</Link>
        )}
        {token && (
          <button className="btn" onClick={handleLogout}>Cerrar sesión</button>
        )}
    
      </div>
    </header>
  );
}

export default Header;
