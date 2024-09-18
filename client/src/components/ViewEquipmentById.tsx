import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EquipmentDetails.css';

interface Stock {
    equipmentId: number;
    id: number;
    locationId: number;
    quantity: number;
}

interface Equipment {
    id: number;
    name: string;
    description: string;
    dateAdded: string;
    stock: Stock[];
}

interface Location {
    id: number;
    name: string;
}

const EquipmentDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token')?.replace(/^"|"$/g, ''); // Elimina comillas alrededor del token;

        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        axios.get(`http://localhost:4000/equipments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            console.log(response.data);
            const equipmentData = response.data.equipment;
            const stockData = response.data.stock;

            // Asignamos el stock dentro del objeto equipment
            setEquipment({
                ...equipmentData,
                stock: stockData || []
            });
        })
        .catch(error => {
            setError('Error fetching equipment data.');
            console.error(error);
        });

        axios.get(`http://localhost:4000/locations`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            console.log('Response from /locations:', response.data);
            const locationsData = response.data;
            if (Array.isArray(locationsData)) {
                setLocations(locationsData);
            } else {
                setError('No se encontraron ubicaciones.');
                console.error('Formato inesperado en la respuesta:', response.data);
            }
        })
    }, [id]);

    const getLocationName = (locationId: number) => {
        if (!locations || locations.length === 0) {
            return 'Cargando ubicación...';
        }
    
        const location = locations.find(loc => loc.id === locationId);
        return location ? location.name : 'Ubicación desconocida';
    };
    
    if (error) {
        return <p>{error}</p>;
    }

    if (!equipment) {
        return <p>Cargando datos del equipo...</p>;
    }

    return (
        <div className='equipment-details-container'>
        <div className="equipment-details-page">
            <h1>{equipment.name}</h1>
            <p>{equipment.description}</p>
            <p>Fecha de agregado: {new Date(equipment.dateAdded).toLocaleDateString()}</p>
            
            <h2>Stock</h2>
            { equipment.stock && equipment.stock.length > 0 ? (
                <ul>
                    {equipment.stock.map((stockItem) => (
                        <li key={stockItem.id}>
                            <p>Cantidad: {stockItem.quantity}</p>
                            <p>Ubicación: {getLocationName(stockItem.locationId)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay stock disponible para este equipo.</p>
            )}
        </div>
        </div>
    );
};

export default EquipmentDetails;