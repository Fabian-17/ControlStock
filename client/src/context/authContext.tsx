import { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import { authService } from '../services/authServices';
import { type } from '../types/type';
import { UserState } from '../interfaces/userState';
import { LoginCredentials } from '../interfaces/loginCredentials';
import { AuthContextProps } from '../interfaces/authContextPops';
import { AuthProviderProps } from '../interfaces/authProvider';


// Crea el contexto con el tipo adecuado
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);


const initialState: UserState = {   
    token: undefined,
    isLogged: false,
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, dispatch] = useReducer(authReducer, initialState, () => {
        const token = authService.getToken();
        return token ? { token, isLogged: true } : { isLogged: false };
    });

    useEffect(() => {
        if (user.isLogged) {
            authService.setToken(user.token!);
        } else {
            authService.removeToken();
        }
    }, [user]);

    const login = async (credentials: LoginCredentials) => {
        try {
            const data = await authService.login(credentials);
            dispatch({
                type: type.LOGIN,
                payload: data,
            });
        } catch (error) {
            console.error('Login error', error);
        }
    };

    const logout = () => {
        authService.logout();
        dispatch({
            type: type.LOGOUT,
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => useContext(AuthContext)