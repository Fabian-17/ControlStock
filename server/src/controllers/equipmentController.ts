import { Request, Response } from 'express';
import { EquipmentService } from '../services/equipmentService';
import {  handleError } from '../utils/errorService';

const equipmentService = new EquipmentService();

export class EquipmentController {

  public async getEquipments(req: Request, res: Response): Promise<void> {
    try {
      const equipments = await equipmentService.getAllEquipment();
      res.json(equipments);
    } catch (error: unknown) {
        const appError = handleError(error);
        res.status(appError.statusCode).json({ message: appError.message });
    };
  };


  public async getEquipmentById(req: Request, res: Response): Promise<void> {
    try {
      const equipment = await equipmentService.getEquipmentById(Number(req.params.id));
      res.json(equipment);
    } catch (error: unknown) {
        const appError = handleError(error);
        res.status(appError.statusCode).json({ message: appError.message });
    };
  };


  public async createEquipment(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, dateAdded } = req.body;
      const { locationId, quantity } = req.body;
      const equipment = await equipmentService.createEquipment({ name, description, dateAdded }, locationId, quantity);
      res.status(201).json(equipment);
    } catch (error: unknown) {
        const appError = handleError(error);
        res.status(appError.statusCode).json({ message: appError.message });
    };
  };


  public async updateEquipment(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, dateAdded } = req.body;
      const equipment = await equipmentService.updateEquipment(Number(req.params.id), { name, description, dateAdded });
      res.json(equipment);
    } catch (error: unknown) {
        const appError = handleError(error);
        res.status(appError.statusCode).json({ message: appError.message });
    };
  };


  public async deleteEquipment(req: Request, res: Response): Promise<void> {
    try {
      await equipmentService.deleteEquipment(Number(req.params.id));
      res.status(204).end();
    } catch (error: unknown) {
        const appError = handleError(error);
        res.status(appError.statusCode).json({ message: appError.message });
    };
  };


};