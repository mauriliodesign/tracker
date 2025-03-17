import { useState, useCallback } from 'react';
import { DEMO_USER } from '../constants/demo';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  belt: string;
  stripes: number;
  avatar: string;
}

export interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Para demo, aceitar qualquer email/senha
    const demoUser: AuthUser = {
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      belt: DEMO_USER.belt,
      stripes: DEMO_USER.stripes,
      avatar: DEMO_USER.avatar
    };

    localStorage.setItem('auth_user', JSON.stringify(demoUser));
    setUser(demoUser);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const demoUser: AuthUser = {
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      belt: DEMO_USER.belt,
      stripes: DEMO_USER.stripes,
      avatar: DEMO_USER.avatar
    };

    localStorage.setItem('auth_user', JSON.stringify(demoUser));
    setUser(demoUser);
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const demoUser: AuthUser = {
      id: DEMO_USER.id,
      name: name || DEMO_USER.name,
      email: email || DEMO_USER.email,
      belt: 'branca',
      stripes: 0,
      avatar: DEMO_USER.avatar
    };

    localStorage.setItem('auth_user', JSON.stringify(demoUser));
    setUser(demoUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_user');
    setUser(null);
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Em produção, isso enviaria um email com o token
    console.log('Reset password requested for:', email);
  }, []);

  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Em produção, isso validaria o token e atualizaria a senha
    console.log('Password reset with token:', token);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    signup,
    logout,
    requestPasswordReset,
    resetPassword
  };
} 