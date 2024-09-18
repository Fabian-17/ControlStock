import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/AuthHook';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();


  const handleSignInClick = () => {
    navigate('/registro');
  };

  const handleLogInClick = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogOutClick = async () => {
    await logout();
    Swal.fire({
      title: "¡Cierre de sesión exitoso!",
      text: "Serás redirigido a la página de inicio.",
      icon: "success",
    });
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.title} onClick={handleHomeClick}>
        Formotex
      </div>
      <div style={styles.buttons}>
        {user?.isLogged ? (
          <button style={styles.button} onClick={handleLogOutClick}>
            Cerrar sesión
          </button>
        ) : (
          <>
            <button style={styles.button} onClick={handleSignInClick}>
              Registrarse
            </button>
            <button style={styles.button} onClick={handleLogInClick}>
              Iniciar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

// Estilos en línea para simplificar el diseño minimalista
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    border: 'none',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};


export default Navbar;