// Componente que usa useContext para guardar el estado y funciones que se usan en toda la aplicación
import { useContext, createContext, useState, useEffect } from 'react';
import type { AuthResponse } from '../types/types';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData: AuthResponse) => {},
  getRefreshToken: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {}, []);

  function checkAuth() {
    if (accessToken) {
      // El usuario está autenticado
    } else {
      // El usuario no está autenticado
      const token = getRefreshToken();
      if (token) {
      }
    }
  }

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const { refreshToken } = JSON.parse(token);
      return refreshToken;
    }
    return null;
  }

  function saveUser(userData: AuthResponse) {
    setAccessToken(userData.body.accessToken);

    localStorage.setItem('token', JSON.stringify(userData.body.refreshToken));
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
