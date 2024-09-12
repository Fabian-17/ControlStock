import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { config } from '../config/config';

const envSecret = config.SECRET_KEY as Secret;

// Tipo para el payload de JWT
type JwtPayload = string | object | Buffer;

// Configuración de opciones para JWT
const jwtOptions: SignOptions = {
    expiresIn: '1h',
};

// Función para crear JWT
export const createJWT = <T extends JwtPayload>(payload: T): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, envSecret, jwtOptions, (err, token) => {
            if (err) {
                reject(new Error(`Error signing JWT: ${err.message}`));
            } else if (!token) {
                reject(new Error('JWT token is null or undefined'));
            } else {
                resolve(token);
            };
        });
    });
};