import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '../types/user';
import { setClearAuthCallback } from '../utils/clearAuthHandler';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  clearAuth: (afterClear?: () => void) => void;
  setAuth: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const setAuth = useCallback(
    (user: User) => {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    },
    [setUser]
  );

  const clearAuth = useCallback(
    (afterClear?: () => void) => {
      setUser(null);
      localStorage.removeItem('user');
      if (afterClear) {
        afterClear();
      }
    },
    [setUser]
  );

  useEffect(() => {
    setClearAuthCallback(clearAuth);
  }, [clearAuth]);

  return (
    <AuthContext.Provider value={{ user, setUser, clearAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
