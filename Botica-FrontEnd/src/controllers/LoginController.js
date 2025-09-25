import { useState, useCallback } from 'react';
import { initialLoginState } from '../models/LoginModel';

export default function useLoginController() {
  const [username, setUsername] = useState(initialLoginState.username);
  const [password, setPassword] = useState(initialLoginState.password);
  const [searchTerm, setSearchTerm] = useState('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!username || !password) {
        alert('Por favor, completa todos los campos');
        return;
      }
      alert('Iniciando sesión...');
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
  };
}
