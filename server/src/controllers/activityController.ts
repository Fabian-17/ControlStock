import { Request, Response } from 'express';
import { ActivityService } from '../services/activityService';
import { AppError } from '../utils/errorService';

const activityService = new ActivityService();

export class ActivityController {


  public async getActivities(req: Request, res: Response): Promise<void> {
    try {
      const activities = await activityService.getActivities();
      res.json(activities);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };


  public async getActivityById(req: Request, res: Response): Promise<void> {
    try {
      const activity = await activityService.getActivityById(Number(req.params.id));
      res.json(activity);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };


  public async createActivity(req: Request, res: Response): Promise<void> {
    try {
      const { type, quantity, date, organizationId, equipmentId, locationId } = req.body;
      const userId = req.body.userId || (req as any).user?.id;

      if (!userId) {
        throw new AppError('User ID is required', 400);
      }

      const activity = await activityService.createActivity(
        { type, quantity, date },
        userId,
        organizationId,
        equipmentId,
        locationId
      );
      
      res.status(201).json(activity);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };
  

  public async updateActivity(req: Request, res: Response): Promise<void> {
    try {
      const { type, quantity, date } = req.body;
      const equipmentId = req.body.equipmentId;
      const activity = await activityService.updateActivity(
        Number(req.params.id),
        { type, quantity, date },
        equipmentId
      );
      res.json(activity);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };


  public async deleteActivity(req: Request, res: Response): Promise<void> {
    try {
      await activityService.deleteActivity(Number(req.params.id));
      res.status(204).end();
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };


};