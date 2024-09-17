import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Access denied: Role not found' });
        }

        const userRole = req.user.role.name;

        if (userRole !== requiredRole) {
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }

        next();
    };
};