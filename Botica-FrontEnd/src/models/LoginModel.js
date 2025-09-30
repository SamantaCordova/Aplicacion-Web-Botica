export const initialLoginState = {
  username: '',
  password: '',
};

// Obtener usuarios de localStorage o inicializar con usuario demo
function getStoredUsers() {
  const stored = localStorage.getItem('users');
  if (stored) return JSON.parse(stored);
  return [
    {
      username: 'usuarioDemo',
      password: '123456',
      email: 'demo@correo.com',
    },
  ];
}

export let users = getStoredUsers();

// Función para registrar usuario
export function registerUser(username, password, email) {
  // Verifica si el usuario ya existe
  const exists = users.some(u => u.username === username);
  if (exists) return false;
  users.push({ username, password, email });
  localStorage.setItem('users', JSON.stringify(users));
  return true;
}

// Función de autenticación
export function authenticate(username, password) {
  return users.some(u => u.username === username && u.password === password);
}
