import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ecosalud.css';
import useLoginController from '../../controllers/LoginController';
import MainLayout from '../layouts/MainLayout';

function LoginView() {

  const {
    username,
    password,
    searchTerm,
    setUsername,
    setPassword,
    setSearchTerm,
    onSubmit,
    onSearchKeyPress,
    redirect,
    setRedirect,
  } = useLoginController();

  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate('/');
      setRedirect(false);
    }
  }, [redirect, navigate, setRedirect]);

  return (
    <MainLayout
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      onSearchKeyPress={onSearchKeyPress}
    >
      {/* Login Form */}
      <div className="login-container liquid-glass">
        {/* Liquid blobs background */}
        <div className="blob blob-1" aria-hidden="true" />
        <div className="blob blob-2" aria-hidden="true" />

        <div className="login-content">
          <h2 className="login-title">Iniciar sesión</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Usuario</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Pepito3734"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit" className="login-button">Aceptar</button>
          </form>
          <div className="register-link">
            ¿No tienes una cuenta?<br />
            <a href="/register">Registrarte</a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default LoginView;
