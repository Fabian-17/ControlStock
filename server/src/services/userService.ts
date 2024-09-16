import { User } from "../models/user";
import { Role } from "../models/role";
import { hashPassword, comparePassword } from "../utils/hash";
import { AppError, handleError } from "../utils/errorService";
import { Iuser } from "../interfaces/InterfaceUser";
import { createJWT } from "../utils/jsonwebtoken";

export class UserService {

    public async getUsers(): Promise<User[]> {
        try {
          const users = await User.findAll({
            include: [{
                model: Role,
                as: 'role',
                attributes: ['name']
            }]
        });
          return users;
        } catch (error: unknown) {
          throw handleError(error);
        };
      };

      
    public async getUserById(id: number): Promise<User> {
      try {
        const user = await User.findByPk(id, {
          include: [{
            model: Role,
            as: 'role',
            attributes: ['name']
          }]
        });
        if (!user) {
          throw new AppError('User not found', 404);
        }
        return user;
      } catch (error: unknown) {
        throw handleError(error);
      }
    }
    
      public async createUser(userName: string, password: string): Promise<User> {
        try {
          const hashedPassword = await hashPassword(password);
           // Asigna un rol por defecto
          const defaultRole = await Role.findOne({ where: { name: 'user' } });
          if (!defaultRole) {
            throw new AppError('Default role not found', 500);
          };
          const user = await User.create({ userName, password: hashedPassword, roleId: defaultRole.id });
          return user;
        } catch (error: unknown) {
          throw handleError(error);
        };
      };
    
      public async updateUser(id: string, username: string, password: string): Promise<User> {
        try {
          const user = await User.findByPk(id);
          if (!user) {
            throw new AppError('User not found', 404);
          };
          if (username) user.userName = username;
          if (password) user.password = await hashPassword(password);
          await user.save();
          return user;
        } catch (error: unknown) {
          throw handleError(error);
        };
      };
    
      public async deleteUser(id: string): Promise<boolean> {
        const user = await User.findByPk(id);
        if (!user) {
          return false; // Usuario no encontrado
        }
        await user.destroy();
        return true; // Usuario eliminado exitosamente
      };

      public async login(userName: string, password: string): Promise<{ token: string, user: Iuser }> {
          try {
          const user = await User.findOne({ where: { userName } });
          if (!user) {
              throw new AppError('User not found', 404);
          };
          const isPasswordValid = await comparePassword(password, user.password);
          if (!isPasswordValid) {
              throw new AppError('Invalid password', 400);
          };
          const payload: Iuser = { id: user.id };
          const token = await createJWT(payload);

          return { token, user: payload };
          } catch (error: unknown) {
          throw handleError(error);
          };
      };
};