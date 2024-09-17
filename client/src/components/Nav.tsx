import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    // Verifica el estado de inicio de sesión desde el localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLogged(loggedIn);
  }, []);

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleLogInClick = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogOutClick = async () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLogged(false);
    swal({
      title: "¡Cierre de sesión exitoso!",
      text: "Serás redirigido a la página de inicio.",
      icon: "success",
      timer: 2000,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#10132F', fontFamily: 'Krub', color: 'white' }}>
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#" style={{ color: 'white', fontFamily: 'Kufam', fontSize: '2em' }} onClick={handleHomeClick}>
          Formotex 
          <img src="img/*" alt="Logo" style={{ width: '50px', marginLeft: '10px' }} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ color: 'white' }}></span>
        </button>
          <div className="d-flex">
            {isLogged ? (
              <button
                className="btn btn-success mx-2"
                style={{ backgroundColor: '#49BA81', color: 'black', borderRadius: '40px', padding: '10px 20px', border: 'none', fontFamily: 'Krub', fontSize: '1.2em' }}
                onClick={handleLogOutClick}
              >
                Cerrar Sesión
              </button>
            ) : (
              <>
                <button
                  className="btn btn-success mx-2"
                  style={{ backgroundColor: '#49BA81', color: 'black', borderRadius: '40px', padding: '10px 20px', border: 'none', fontFamily: 'Krub', fontSize: '1.2em' }}
                  onClick={handleSignInClick}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-success mx-2"
                  style={{ backgroundColor: '#49BA81', color: 'black', borderRadius: '40px', padding: '10px 20px', border: 'none', fontFamily: 'Krub', fontSize: '1.2em' }}
                  onClick={handleLogInClick}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
    </nav>
  );
};

export default Navbar;