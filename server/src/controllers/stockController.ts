import { Request, Response } from 'express';
import { StockService } from '../services/stockService';
import { AppError } from '../utils/errorService';

const stockService = new StockService();

export class StockController {

  public async getStockByLocation(req: Request, res: Response): Promise<void> {
    try {
      const locationId = Number(req.params.locationId);
      const stock = await stockService.getStockByLocation(locationId);
      res.json(stock);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };

  public async updateStock(req: Request, res: Response): Promise<void> {
    try {
      const { equipmentId, locationId, quantity } = req.body;
      const updatedStock = await stockService.updateStock(equipmentId, locationId, quantity);
      res.json(updatedStock);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };

  public async moveEquipment(req: Request, res: Response): Promise<void> {
    try {
      const { equipmentId, fromLocationId, toLocationId, quantity } = req.body;
      await stockService.moveEquipment(equipmentId, fromLocationId, toLocationId, quantity);
      res.status(204).end();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };

  public async getStockById (req: Request, res: Response): Promise<void> {
    try {
      const stockId = Number(req.params.stockId);
      const stock = await stockService.getStockById(stockId);
      res.json(stock);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };

  public async getStockByEquipment(req: Request, res: Response): Promise<void> {
    try {
      const equipmentId = Number(req.params.equipmentId);
      const stock = await stockService.getStockByEquipment(equipmentId);
      res.json(stock);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };

  
};
