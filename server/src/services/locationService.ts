import { Location } from '../models/location';
import { Stock } from '../models/stock';
import { Equipment } from '../models/equipment';
import { AppError } from '../utils/errorService';

export class LocationService {

  // Obtener todas las ubicaciones con su stock
  public async getLocationsWithStock(): Promise<Location[]> {
    try {
      const locations = await Location.findAll({
        include: [
          {
            model: Stock,
            as: 'stocks',
            include: [{ model: Equipment, as: 'equipment' }]
          }
        ]
      });
      return locations;
    } catch (error) {
      throw new AppError('Error retrieving locations', 500);
    };
  };

    // Obtener una ubicación por ID con su stock
    public async getLocationById(id: number): Promise<Location | null> {
      try {
        const location = await Location.findByPk(id, {
          include: [
            {
              model: Stock,
              as: 'stocks',
              include: [{ model: Equipment, as: 'equipment' }]
            }
          ]
        });
        return location;
      } catch (error) {
        throw new AppError('Error retrieving location', 500);
      };
    };

    // Crear una ubicación
    public async createLocation(data: Partial<Location>): Promise<Location> {
      try {
        const { name, address } = data;
        const location = await Location.create({ name, address });
        return location;
      } catch (error) {
        throw new AppError('Error creating location', 500);
      };
    };

    // Actualizar una ubicación
    public async updateLocation(id: number, data: Partial<Location>): Promise<Location | null> {
      try {
        const location = await Location.findByPk(id);
        if (!location) throw new AppError('Location not found', 404);
        await location.update(data);
        return location;
      } catch (error) {
        throw new AppError('Error updating location', 500);
      };
    };

    // Eliminar una ubicación
    public async deleteLocation(id: number): Promise<void> {
      try {
        const location = await Location.findByPk(id);
        if (!location) throw new AppError('Location not found', 404);
        await location.destroy();
      } catch (error) {
        throw new AppError('Error deleting location', 500);
      };
    };

};