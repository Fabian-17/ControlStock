import { Activity } from '../models/activity';
import { ActivityDetails } from '../models/activityDetails';
import { Stock } from '../models/stock';
import { Equipment } from '../models/equipment';
import { Location } from '../models/location';
import { AppError } from '../utils/errorService';



export class ActivityService {

  // Obtiene todas las actividades
  public async getActivities(): Promise<Activity[]> {
    try {
      const activities = await Activity.findAll({
        include: [
          {
            model: ActivityDetails,
            as: 'activityDetails',
          },
        ],
      });
      return activities;
    } catch (error: unknown) {
      throw new AppError('Error getting activities', 500);
    };
  };


  // Obtiene una actividad por ID
  public async getActivityById(id: number): Promise<Activity | null> {
    try {
      const activity = await Activity.findByPk(id, {
        include: [
          {
            model: ActivityDetails,
            as: 'activityDetails',
          },
        ],
      });
      return activity;
    } catch (error: unknown) {
      throw new AppError('Error getting activity', 500);
    };
  };


  // Crea una actividad y actualiza el stock, la ubicación y la organización si se proporcionan
  public async createActivity(
    data: Partial<Activity>, 
    userId: number, 
    organizationId?: number, 
    equipmentId?: number, 
    locationId?: number
  ): Promise<Activity> {
    try {
      const { type, quantity = 0, date } = data;

      // Verifica si el equipo existe
      let equipment = await Equipment.findByPk(equipmentId);
      if (!equipment) {
        throw new AppError('Equipment not found', 404);
      }

      // Crea la actividad
      const activity = await Activity.create({ type, quantity, date, userId });

      // Actualiza el stock según la actividad (agregar o retirar)
      let stock = await Stock.findOne({ where: { equipmentId } });
      if (!stock) {
        // Si no hay stock existente, lo creamos
        stock = await Stock.create({ equipmentId, quantity });
      } else {
        // Actualizamos el stock existente
        stock.quantity = type === 'ADD' ? stock.quantity + quantity : stock.quantity - quantity;
        await stock.save();
      };

      // Actualiza la ubicación si se proporciona
      if (locationId) {
        let location = await Location.findByPk(locationId);
        if (location) {
          location.name = location.name;
          await location.save();
        };
      };

      // Crea una ActivityDetails para reflejar la relación con la organización
      if (organizationId) {
        await ActivityDetails.create({
          activityId: activity.id,
          organizationId,
          equipmentId,
        });
      };

      return activity;
    } catch (error: unknown) {
      throw new AppError('Error creating activity', 500);
    };
  };


// Actualiza una actividad existente
  public async updateActivity( id: number, activityData: Partial<Activity>, equipmentId?: number ): Promise<Activity | null> {
    try {
      const activity = await Activity.findByPk(id);
      if (!activity) throw new AppError('Activity not found', 404);

      // Actualiza los datos de la actividad
      await activity.update(activityData);

      // Actualiza el stock si cambia el tipo de actividad o la cantidad
      if (equipmentId && activityData.quantity) {
        let stock = await Stock.findOne({ where: { equipmentId } });
        if (!stock) throw new AppError('Stock not found', 404);
        
        // Actualiza el stock basado en la nueva cantidad
        stock.quantity += activityData.type === 'ADD' ? activityData.quantity : -activityData.quantity;
        await stock.save();
      };

      return activity;
    } catch (error: unknown) {
      throw new AppError('Error updating activity', 500);
    };
  };


  public async deleteActivity(id: number): Promise<void> {
    try {
      const activity = await Activity.findByPk(id);
      if (!activity) throw new AppError('Activity not found', 404);
      await activity.destroy();
    } catch (error: unknown) {
      throw new AppError('Error deleting activity', 500);
    };
  };


};