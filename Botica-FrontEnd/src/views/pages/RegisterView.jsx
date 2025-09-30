
import React, { useState } from 'react';
import '../../styles/ecosalud.css';
import { registerUser } from '../../models/LoginModel';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';

function RegisterView() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    // Validación básica de email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('El correo no es válido');
      return;
    }
    const success = registerUser(username, password, email);
    if (success) {
      alert('Usuario registrado exitosamente');
      navigate('/login');
    } else {
      setError('El usuario ya existe');
    }
  };

  const onSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      const term = e.target.value;
      if (term) {
        alert('Buscando: ' + term);
      }
    }
  };

  return (
    <MainLayout
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      onSearchKeyPress={onSearchKeyPress}
    >
      <div className="login-container liquid-glass">
        <div className="blob blob-1" aria-hidden="true" />
        <div className="blob blob-2" aria-hidden="true" />
        <div className="login-content">
          <h2 className="login-title">Registrarse</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Usuario</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: NuevoUsuario"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                className="form-input"
                placeholder="Ej: correo@ejemplo.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••••••"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                type="password"
                className="form-input"
                placeholder="Repite la contraseña"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <button type="submit" className="login-button">Registrarse</button>
          </form>
          <div className="register-link">
            ¿Ya tienes una cuenta?<br />
            <a href="/login">Iniciar sesión</a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default RegisterView;
