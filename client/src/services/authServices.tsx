import { LoginCredentials } from "../interfaces/loginCredentials";

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data;
    },
    
    logout: (): void => {
        localStorage.removeItem('token');
    },
    
    getToken: (): string => {
        return JSON.parse(localStorage.getItem('token') as string);
    },

    setToken: (data: string): void => {
        localStorage.setItem('token', JSON.stringify(data));
    },

    removeToken: (): void => {
        localStorage.removeItem('token');
    }
};