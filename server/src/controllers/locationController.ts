import { Request, Response } from 'express';
import { LocationService } from '../services/locationService';
import { AppError } from '../utils/errorService';

const locationService = new LocationService();

export class LocationController {

  public async getLocationsWithStock(req: Request, res: Response): Promise<void> {
    try {
      const locations = await locationService.getLocationsWithStock();
      res.json(locations);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };

    public async getLocationById(req: Request, res: Response): Promise<void> {
        try {
        const locationId = Number(req.params.id);
        const location = await locationService.getLocationById(locationId);
        res.json(location);
        } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        };
        };
    };

    public async createLocation(req: Request, res: Response): Promise<void> {
        try {
        const { name, address } = req.body;
        const location = await locationService.createLocation({ name, address });
        res.status(201).json(location);
        } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        };
        };
    };

    public async updateLocation(req: Request, res: Response): Promise<void> {
        try {
        const locationId = Number(req.params.id);
        const { name, address } = req.body;
        const location = await locationService.updateLocation(locationId, { name, address });
        res.json(location);
        } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        };
        };
    };

    public async deleteLocation(req: Request, res: Response): Promise<void> {
        try {
        const locationId = Number(req.params.id);
        await locationService.deleteLocation(locationId);
        res.status(204).end();
        } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        };
        };
    };

};