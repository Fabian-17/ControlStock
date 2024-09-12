import { User } from "../models/user";
import { hashPassword, comparePassword } from "../utils/hash";
import { AppError, handleError } from "../utils/errorService";

export class UserService {

    public async getUsers(): Promise<User[]> {
        try {
          const users = await User.findAll();
          return users;
        } catch (error: unknown) {
          throw handleError(error);
        };
      };

      
    public async getUserById(id: string): Promise<User> {
        try {
          const user = await User.findByPk(id);
          if (!user) {
            throw new AppError('User not found', 404);
          };
          return user;
        } catch (error: unknown) {
          throw handleError(error);
        };
      };
    
      public async createUser(username: string, password: string): Promise<User> {
        try {
          const hashedPassword = await hashPassword(password);
          const user = await User.create({ username, password: hashedPassword });
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
    
      public async deleteUser(id: string): Promise<void> {
        try {
          const user = await User.findByPk(id);
          if (!user) {
            throw new AppError('User not found', 404);
          };
          await user.destroy();
        } catch (error: unknown) {
          throw handleError(error);
        };
      };

      public async login(username: string, password: string): Promise<User> {
          try {
          const user = await User.findOne({ where: { username } });
          if (!user) {
              throw new AppError('User not found', 404);
          };
          const isPasswordValid = await comparePassword(password, user.password);
          if (!isPasswordValid) {
              throw new AppError('Invalid password', 400);
          };
          return user;
          } catch (error: unknown) {
          throw handleError(error);
          };
      };
};