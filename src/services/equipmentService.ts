import { Equipment } from "../models/equipment";
import { AppError } from "../utils/errorService";


export class EquipmentService {

    public async getAllEquipment(): Promise<Equipment[]> {
        try {
        const equipment = await Equipment.findAll();
        return equipment;
        } catch (error: unknown) {
        throw new AppError('Error getting equipment', 500);
        };
    };

    public async getEquipmentById(id: number): Promise<Equipment | null> {
        try {
        const equipment = await Equipment.findByPk(id);
        return equipment;
        } catch (error: unknown) {
        throw new AppError('Error getting equipment', 500);
        };
    };

    public async createEquipment(data: Partial<Equipment>): Promise<Equipment> {
        try {
        const { name, description, dateAdded } = data;
        const equipment = await Equipment.create({ name, description, dateAdded });
        return equipment;
        } catch (error: unknown) {
        throw new AppError('Error creating equipment', 500);
        };
    };

    public async updateEquipment(id: number, data: Partial<Equipment>): Promise<Equipment | null> {
        try {
          const equipment = await Equipment.findByPk(id);
          if (!equipment) throw new AppError('Equipment not found', 404);
          return await equipment.update(data);
        } catch (error: unknown) {
          throw new AppError('Error updating equipment', 500);
        };
      };

    public async deleteEquipment(id: number): Promise<void> {
        try {
        const equipment = await Equipment.findByPk(id);
        if (!equipment) throw new AppError('Equipment not found', 404);
        await equipment.destroy();
        } catch (error: unknown) {
        throw new AppError('Error deleting equipment', 500);
        };
    };
    
};