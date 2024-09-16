import jwt from 'jsonwebtoken';
import { UserService } from '../services/userService';
import { config } from '../config/config';
import { Request, Response, NextFunction } from 'express';

const UserServices = new UserService();

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware de autenticación ejecutado");

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No or invalid token provided' });
        }

        const token = authHeader.split(' ')[1]; // Extrae el token eliminando el prefijo 'Bearer'

        if (!config.SECRET_KEY) {
            return res.status(500).json({ message: 'Internal server error: Secret key not configured' });
        }

        // Verificación del token
        let decoded;
        try {
            decoded = jwt.verify(token, config.SECRET_KEY);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: 'Unauthorized: Token has expired' });
            } else if (err instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            } else {
                return res.status(500).json({ message: 'Internal server error: Token verification failed' });
            }
        }

        const user = await UserServices.getUserById((decoded as jwt.JwtPayload).id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid user' });
        }

        req.user = { id: user.id, role: user.Role.name }; // Adjunta el ID y el rol del usuario al objeto de solicitud

        next(); // Continúa al siguiente middleware o controlador
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    };
};