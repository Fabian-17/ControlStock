import jwt from "jsonwebtoken";
import { config } from "../config/config";


type TokenPayload = {
    id: number;
};

export class AuthService {
    static async verifyToken(token: string) {
      const payload = jwt.verify(token, config.SECRET_KEY || '') as TokenPayload;
  
      if (!payload.id) {
        throw new Error("Invalid token");
      }
  
      return payload;
    }

};