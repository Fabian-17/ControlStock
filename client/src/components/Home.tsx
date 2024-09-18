import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

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
            console.log(response.data);
            const equipmentData = response.data.map((item: any) => item.equipment);
            setEquipments(equipmentData);
        })
        .catch(error => {
            setError('Error fetching equipment data.');
            console.error(error);
        });
    }, []);

    const addOrganization = () => {
        navigate('/addOrganization');
    };

    const addEquipment = () => {
        navigate('/addEquipment');
    };

    const addLocation = () => {
        navigate('/home/addLocation');
    };
    

    return (
        <div className="home-page">
            <div className="header">
                <h1>Bienvenido al sistema de Formotex</h1>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="button-group">
                <button className="button" onClick={addOrganization}>Agregar Organización</button>
                <button className="button" onClick={addEquipment}>Agregar Equipos</button>
                <button className="button" onClick={addLocation}>Agregar Ubicaciones</button>
            </div>
            <div className="equipment-list">
                {equipments.length > 0 ? (
                    <ul>
                        {equipments.map((equipment) => (
                            <li key={equipment.id} className="list-item">
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