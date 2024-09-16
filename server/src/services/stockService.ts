import { Stock } from '../models/stock';
import { Equipment } from '../models/equipment';
import { Location } from '../models/location';
import { AppError } from '../utils/errorService';

export class StockService {
  
  // Obtener stock por ubicación
  public async getStockByLocation(locationId: number): Promise<Stock[]> {
    try {
      const stock = await Stock.findAll({
        include: [
          { model: Equipment, as: 'equipment' },
          { model: Location, as: 'location', where: { id: locationId } }
        ]
      });
      return stock;
    } catch (error) {
      throw new AppError('Error retrieving stock', 500);
    };
  };

  
  // Actualizar stock de un equipo en una ubicación
  public async updateStock(equipmentId: number, locationId: number, newQuantity: number): Promise<Stock | null> {
    try {
      const stock = await Stock.findOne({
        where: { equipmentId, locationId }
      });
      if (!stock) throw new AppError('Stock not found for this equipment and location', 404);
      stock.quantity = newQuantity;
      await stock.save();
      return stock;
    } catch (error) {
      throw new AppError('Error updating stock', 500);
    };
  };

  
  // Mover equipo entre ubicaciones (actualiza stock)
  public async moveEquipment(equipmentId: number, fromLocationId: number, toLocationId: number, quantity: number): Promise<void> {
    try {
      const fromStock = await Stock.findOne({ where: { equipmentId, locationId: fromLocationId } });
      const toStock = await Stock.findOne({ where: { equipmentId, locationId: toLocationId } });

      if (!fromStock || fromStock.quantity < quantity) {
        throw new AppError('Insufficient stock to move', 400);
      };

      // Restar del stock de la ubicación de origen
      fromStock.quantity -= quantity;
      await fromStock.save();

      // Sumar al stock de la ubicación de destino
      if (toStock) {
        toStock.quantity += quantity;
      } else {
        await Stock.create({ equipmentId, locationId: toLocationId, quantity });
      };
    } catch (error) {
      throw new AppError('Error moving equipment between locations', 500);
    };
  };


    // Obtener stock por ID
    public async getStockById(stockId: number): Promise<Stock> {
        try {
        const stock = await Stock.findByPk(stockId);
        if (!stock) throw new AppError('Stock not found', 404);
        return stock;
        } catch (error) {
        throw new AppError('Error retrieving stock', 500);
        };
    };

    // Obtener stock por equipo
    public async getStockByEquipment(equipmentId: number): Promise<Stock[]> {
        try {
        const stock = await Stock.findAll({
            include: [
            { model: Equipment, as: 'equipment', where: { id: equipmentId } }
            ]
        });
        return stock;
        } catch (error) {
        throw new AppError('Error retrieving stock', 500);
        };
    };


};