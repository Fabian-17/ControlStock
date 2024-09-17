import { Equipment } from "../models/equipment";
import { Stock } from "../models/stock";
import { AppError, handleError } from "../utils/errorService";


export class EquipmentService {

    // Obtiene todos los equipos con su stock y ubicación
    public async getAllEquipment(): Promise<{ equipment: Equipment, stock: Stock[] }[]> {
      try {
        const equipmentList = await Equipment.findAll();
        const equipmentWithStock = await Promise.all(equipmentList.map(async (equipment) => {
          const stock = await Stock.findAll({ where: { equipmentId: equipment.id } });
          return { equipment, stock };
        }));
        return equipmentWithStock;
      }  catch (error: unknown) {
        throw handleError(error);
      };
    };


    // Obtiene un equipo por ID con su stock y ubicación
    public async getEquipmentById(id: number): Promise<{ equipment: Equipment | null, stock: Stock[] }> {
      try {
        const equipment = await Equipment.findByPk(id);
        if (!equipment) throw new AppError('Equipment not found', 404);

        const stock = await Stock.findAll({ where: { equipmentId: id } });
        return { equipment, stock };
      }  catch (error: unknown) {
        throw handleError(error);
      };
    };


    // Crea un equipo y lo agrega a una ubicación con stock inicial
    public async createEquipment(data: Partial<Equipment>, locationId: number, quantity: number): Promise<Equipment> {
      try {
        const { name, description, dateAdded } = data;
        const equipment = await Equipment.create({ name, description, dateAdded });
      
          // Crea el stock inicial para este equipo
          await Stock.create({ equipmentId: equipment.id, locationId, quantity });
      
          return equipment;
        }  catch (error: unknown) {
          throw handleError(error);
        };
    };


    // Actualiza un equipo y su stock
    public async updateEquipment(id: number, data: Partial<Equipment>, stockQuantity?: number): Promise<Equipment | null> {
      try {
        const equipment = await Equipment.findByPk(id);
        if (!equipment) throw new AppError('Equipment not found', 404);
    
        // Actualiza la información del equipo
        await equipment.update(data);
    
        // Se actualiza el stock si se proporciona una cantidad
        if (stockQuantity !== undefined) {
          await Stock.update({ quantity: stockQuantity }, { where: { equipmentId: id } });
        };
    
        return equipment;
      } catch (error: unknown) {
        throw handleError(error);
      };
    };
    

    // Elimina un equipo y su stock
    public async deleteEquipment(id: number): Promise<void> {
      try {
        const equipment = await Equipment.findByPk(id);
        if (!equipment) throw new AppError('Equipment not found', 404);
        await equipment.destroy();
  
        // Eliminar el stock relacionado
        await Stock.destroy({ where: { equipmentId: id } });
      }  catch (error: unknown) {
        throw handleError(error);
      };
    };
    
};