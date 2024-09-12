import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { AppError } from '../utils/errorService';

const userService = new UserService();

export class UserController {

  public async getUsers(req: Request, res: Response): Promise<void> {
      try {
      const users = await userService.getUsers();
      res.json(users);
      } catch (error: unknown) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
      } else {
          res.status(500).json({ message: 'Internal server error' });
        };
      };
  };

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json(user);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await userService.createUser(username, password);
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await userService.updateUser(req.params.id, username, password);
      res.json(user);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).end();
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await userService.login(username, password);
      res.json(user);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      };
    };
  };

};
