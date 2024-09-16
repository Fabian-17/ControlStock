import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    user: {
        role: string;
    };
}

export const authorizeRole = (requiredRole: string) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const userRole = req.user.role;

        if (userRole !== requiredRole) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
};