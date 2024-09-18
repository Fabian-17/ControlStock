import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './EquipmentForm.css';

interface Location {
  id: number;
  name: string;
}

interface EquipmentFormProps {
  onSubmit: (equipmentData: { name: string, description: string, dateAdded: string, locationId: number, quantity: number }) => void;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [locationId, setLocationId] = useState<number | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch locations when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token')?.replace(/^"|"$/g, ''); // Elimina comillas alrededor del token

    if (!token) {
      setError('No token found. Please log in.');
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'No token found. Please log in.',
      });
      return;
    }

    axios.get('http://localhost:4000/locations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations', error);
        Swal.fire({
          icon: 'error',
          title: 'Error fetching locations',
          text: 'There was an issue loading locations. Please try again later.',
        });
      });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (locationId === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Location',
        text: 'Please select a location before submitting.',
      });
      return;
    }

    const token = localStorage.getItem('token')?.replace(/^"|"$/g, ''); // Elimina comillas alrededor del token

    if (!token) {
      setError('No token found. Please log in.');
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'No token found. Please log in.',
      });
      return;
    }

    const equipmentData = { name, description, dateAdded, locationId, quantity };

    axios.post('http://localhost:4000/equipments', equipmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        onSubmit(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Equipment Added',
          text: 'The equipment was successfully added!',
        });

        // Reset form
        setName('');
        setDescription('');
        setDateAdded('');
        setQuantity(0);
        setLocationId(null);
      })
      .catch(error => {
        console.error('Error adding equipment', error);
        Swal.fire({
          icon: 'error',
          title: 'Error adding equipment',
          text: 'There was an issue adding the equipment. Please try again.',
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="equipment-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">Nombre del equipo</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description" className="form-label">Descripción</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateAdded" className="form-label">Fecha en la que se agrega</label>
        <input
          type="date"
          id="dateAdded"
          value={dateAdded}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDateAdded(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity" className="form-label">Cantidad</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="location" className="form-label">selecciona su ubicación</label>
        <select
          id="location"
          value={locationId ?? ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setLocationId(Number(e.target.value))}
          className="form-select"
        >
          <option value="" disabled>Selecciona la ubicación</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-button">Agregar Equipo</button>
    </form>
  );
};

export default EquipmentForm;