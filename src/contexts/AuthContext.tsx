import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { InstagramAccount } from '../types/instagram';
import { instagramApi } from '../services/instagramApi';

interface AuthContextType {
  isAuthenticated: boolean;
  user: InstagramAccount | null;
  login: (code: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<InstagramAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('instagram_access_token');
    if (token) {
      instagramApi.setAccessToken(token);
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const profile = await instagramApi.getUserProfile();
      setUser(profile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('instagram_access_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (code: string) => {
    setLoading(true);
    try {
      const token = await instagramApi.exchangeCodeForToken(code);
      localStorage.setItem('instagram_access_token', token);
      instagramApi.setAccessToken(token);
      await fetchUserProfile();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('instagram_access_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};