import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { AppError, handleError } from '../utils/errorService';
import { createJWT } from '../utils/jsonwebtoken';

const userService = new UserService();

export class UserController {

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error: unknown) {
      const appError = handleError(error);
      res.status(appError.statusCode).json({ message: appError.message });
    };
  };

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        throw new AppError('Invalid user ID', 400);
      };
      const user = await userService.getUserById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      };
      res.json(user);
    } catch (error: unknown) {
      const appError = handleError(error);
      res.status(appError.statusCode).json({ message: appError.message });
    };
  };

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new AppError('Username and password are required', 400);
      };
      const user = await userService.createUser(username, password);
      res.status(201).json(user);
    } catch (error: unknown) {
      const appError = handleError(error);
      res.status(appError.statusCode).json({ message: appError.message });
    };
  };

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new AppError('Username and password are required', 400);
      };
      const user = await userService.updateUser(req.params.id, username, password);
      if (!user) {
        throw new AppError('User not found', 404);
      };
      res.json(user);
    } catch (error: unknown) {
      const appError = handleError(error);
      res.status(appError.statusCode).json({ message: appError.message });
    };
  };

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userDeleted = await userService.deleteUser(req.params.id);
      if (!userDeleted) {
        throw new AppError('User not found', 404);
      };
      res.status(204).end();
    } catch (error: unknown) {
      const appError = handleError(error);
      res.status(appError.statusCode).json({ message: appError.message });
    };
  };

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new AppError('Username and password are required', 400);
      };
      
      const user = await userService.login(username, password);
      if (!user) {
        throw new AppError('Invalid credentials', 401);
      };
      
      // Crea el JWT token
      const token = await createJWT({ id: user.user.id, username: user.user.userName });
      
      // Respuesta con el token y la información del usuario
      res.json({ token, user });
    } catch (error: unknown) {
      const appError = handleError(error);
      res.status(appError.statusCode).json({ message: appError.message });
    };
  };
};