import { Equipment } from "../models/equipment";
import { Stock } from "../models/stock";
import { AppError } from "../utils/errorService";


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
      } catch (error: unknown) {
        throw new AppError('Error getting equipment with stock', 500);
      };
    };


    // Obtiene un equipo por ID con su stock y ubicación
    public async getEquipmentById(id: number): Promise<{ equipment: Equipment | null, stock: Stock[] }> {
      try {
        const equipment = await Equipment.findByPk(id);
        if (!equipment) throw new AppError('Equipment not found', 404);

        const stock = await Stock.findAll({ where: { equipmentId: id } });
        return { equipment, stock };
      } catch (error: unknown) {
        throw new AppError('Error getting equipment with stock', 500);
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
        } catch (error) {
        throw new AppError('Error creating equipment', 500);
      };
    };


    // Actualiza un equipo y su stock
    public async updateEquipment(id: number, data: Partial<Equipment>): Promise<Equipment | null> {
      try {
        const equipment = await Equipment.findByPk(id);
        if (!equipment) throw new AppError('Equipment not found', 404);
        await equipment.update(data);
        await Stock.update({ equipmentId: id }, { where: { equipmentId: id } });
        return equipment;
      } catch (error) {
        throw new AppError('Error updating equipment', 500);
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
      } catch (error) {
        throw new AppError('Error deleting equipment', 500);
      };
    };
    
};