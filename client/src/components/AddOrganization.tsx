import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './LocationForm.css';


interface FormState {
  name: string;
  address: string;
}

const FormOrganization: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    address: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validación simple
    if (formState.name.trim() === '' || formState.address.trim() === '') {
      setError('Please fill out all fields');
      return;
    }

    const token = localStorage.getItem('token')?.replace(/^"|"$/g, ''); // Elimina comillas alrededor del token;

    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/organizations', formState, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error('Error adding organization');
      }

      Swal.fire({
        icon: 'success',
        title: 'Organización agregada!',
        text: 'La organización ha sido agregada exitosamente.',
      });

      navigate('/home');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='container'>
        <div className="form-container">
            <h1>Agregar Organización</h1>
            {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formState.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Agregar Ubicación</button>
                </form>
        </div>
    </div>
  );
};

export default FormOrganization;