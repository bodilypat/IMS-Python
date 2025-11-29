//src/services/authService.js 

import userApi from '../api/userApi';

const TOKEN_KEY = 'auth_token';

const authService = {
    
  login: async (username: string, password: string): Promise<void> => {
    const response = await userApi.login(username, password);
    
    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
    } else {
      throw new Error('Login failed');
    }
  },

    logout: (): void => {
      localStorage.removeItem(TOKEN_KEY);
    },

    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    },

    isAuthenticated: (): boolean => {
        return localStorage.getItem(TOKEN_KEY) !== null;
    },

    async register(username: string, password: string, email: string): Promise<void> {
        const response = await userApi.register(username, password, email);
        if (!response.success) {
            throw new Error('Registration failed');
        }
    },

};
