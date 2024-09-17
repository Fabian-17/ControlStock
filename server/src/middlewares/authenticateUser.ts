import jwt from 'jsonwebtoken';
import { UserService } from '../services/userService';
import { config } from '../config/config';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

type IUser = {
    userName: string;
    role: {
        name: string;
    };
};

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

const UserServices = new UserService();

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware de autenticación ejecutado");

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No or invalid token provided' });
        }

        const token = authHeader.split(' ')[1]; // Extrae el token eliminando el prefijo 'Bearer'

        if (!token) {
            return res.status(401).json({ message: "Token is required" });
          }    

        if (!config.SECRET_KEY) {
            return res.status(500).json({ message: 'Internal server error: Secret key not configured' });
        }

        const { id } = await AuthService.verifyToken(token);

        if (!id) {
          return res.status(401).json({ message: "Invalid token" });
        }
  
        const user = await UserServices.getUserById(id);
  
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
  
        req.user = {
            userName: user.userName,
            role: {
                name: user.role.name,
            },
        };

        next(); // Continúa al siguiente middleware o controlador
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    };
};