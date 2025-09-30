import { useState, useCallback } from 'react';
import { initialLoginState, authenticate } from '../models/LoginModel';

export default function useLoginController() {
  const [username, setUsername] = useState(initialLoginState.username);
  const [password, setPassword] = useState(initialLoginState.password);
  const [searchTerm, setSearchTerm] = useState('');

  // Para redirección
  const [redirect, setRedirect] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!username || !password) {
        alert('Por favor, completa todos los campos');
        return;
      }
      if (authenticate(username, password)) {
        setRedirect(true);
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    },
    [username, password]
  );

  const onSearchKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      const term = e.target.value;
      if (term) {
        alert('Buscando: ' + term);
      }
    }
  }, []);

  return {
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
  };
}
