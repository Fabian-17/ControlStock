import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

interface Equipment {
    id: number;
    name: string;
    description: string;
}

const Home: React.FC = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token')?.replace(/^"|"$/g, ''); // Elimina comillas alrededor del token;

        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        axios.get('http://localhost:4000/equipments', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            setEquipments(response.data);
        })
        .catch(error => {
            setError('Error fetching equipment data.');
            console.error(error);
        });
    }, []);
    

    return (
        <div className="home-page">
            <div className="header">
                <h1>Bienvenido al sistema de Formotex</h1>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="button-group">
                <button className="button" onClick={() => alert('Add Organization clicked')}>Agregar Organización</button>
                <button className="button" onClick={() => alert('Add Equipment clicked')}>Agregar Equipos</button>
                <button className="button" onClick={() => alert('Add Location clicked')}>Agregar Ubicaciones</button>
            </div>
            <div className="equipment-list">
                {equipments.length > 0 ? (
                    <ul>
                        {equipments.map((equipment, index) => (
                            <li key={index} className="list-item">
                                <h2 className="item-name">{equipment.name}</h2>
                                <p className="item-description">{equipment.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay equipos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default Home;