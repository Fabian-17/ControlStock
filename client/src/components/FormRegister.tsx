import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './RegisterForm.css';

interface FormState {
  userName: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    userName: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validación simple
    if (formState.userName.trim() === '' || formState.password.trim() === '') {
      setError('Please fill out all fields');
      setIsLoading(false);
      return;
    }

    if (formState.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error registering');
      }

      // Mostrar SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: 'Registration successful!',
        text: 'You have been registered successfully.',
        confirmButtonText: 'Go to login',
      }).then(() => {
        navigate('/login');
      });

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>
        {error && <p className="register-error">{error}</p>}
        <div className="register-input-group">
          <label htmlFor="userName" className="register-label">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formState.userName}
            onChange={handleInputChange}
            placeholder="Enter your username"
            className="register-input"
          />
        </div>
        <div className="register-input-group">
          <label htmlFor="password" className="register-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="register-input"
          />
        </div>
        <button type="submit" className="register-button" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;