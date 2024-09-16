import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware para validar los campos de las peticiones
export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
};