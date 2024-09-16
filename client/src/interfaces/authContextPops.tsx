import { UserState } from './userState';
import { LoginCredentials } from './loginCredentials';

// Define el tipo de contexto
export interface AuthContextProps {
    user: UserState;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}