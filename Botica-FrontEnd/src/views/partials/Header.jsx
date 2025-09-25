import React from 'react';
import { Link } from 'react-router-dom';

const SearchIcon = () => (
  <svg 
    className="search-icon" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

function Header({
  searchTerm = '',
  onSearchChange,
  onSearchKeyPress,
}) {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/" aria-label="Ir al inicio">
          <img className="logo-img" src="/assets/Logodef.png" alt="EcoSalud" />
        </Link>
      </div>

      <div className="search-center">
        <div className="search-container">
          <SearchIcon />
          <input
            type="text"
            className="search-input"
            placeholder="Busca una marca o producto"
            value={searchTerm}
            onChange={onSearchChange}
            onKeyPress={onSearchKeyPress}
            aria-label="Buscar"
          />
        </div>
      </div>

      <nav className="nav-menu">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/catalogo" className="nav-link">Catálogo</Link>
        <Link to="/carrito" className="nav-link">Carrito</Link>
        <Link to="/login" className="login-btn">Iniciar sesión</Link>
      </nav>
    </div>
  );
}

export default Header;
