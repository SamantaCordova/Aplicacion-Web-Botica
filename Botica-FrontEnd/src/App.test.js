import { render, screen } from '@testing-library/react';
import App from './App';

test('renders LoginView with title and form controls', () => {
  render(<App />);
  expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Aceptar/i })).toBeInTheDocument();
});
