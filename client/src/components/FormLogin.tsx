import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LogInForm.css';
import { useAuth } from '../hooks/AuthHook';
import LoginImg from '../assets/img/login.jpg';

const LoginForm: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { userName, password };

    try {
      await login(user);

    
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Serás redirigido a la página de inicio.',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        
        navigate('/home');
      });

    } catch (error: any) {
      console.error('Error al ingresar', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al iniciar sesión. Inténtalo de nuevo.',
      });
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src={LoginImg}
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <label className="form-label" htmlFor="userInput">Username</label>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="userInput"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="passwordInput">Contraseña</label>
                <input
                  type="password"
                  id="passwordInput"
                  className="form-control form-control-lg"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="rememberMeCheck" />
                  <label className="form-check-label" htmlFor="rememberMeCheck">
                    Recordarme
                  </label>
                </div>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                  Iniciar Sesión
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  ¿No tienes una cuenta? <a href="/registro" className="link-danger">Registrarse</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;