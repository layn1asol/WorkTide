import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  userType: string;
  createdAt: string;
  // Additional profile fields
  title?: string;
  bio?: string;
  skills?: string[];
  hourlyRate?: number;
  rating?: number;
  completedJobs?: number;
  location?: string;
  imageUrl?: string;
  languages?: string[];
  education?: Education[];
  experience?: Experience[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.auth.me, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // If the token is invalid, clear it
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      // Only clear token if it's an authentication error, not a network error
      if (error instanceof Error && error.message !== 'Failed to fetch') {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
    
    // Add a retry mechanism for network issues
    const retryTimeout = setTimeout(() => {
      if (!user && token) {
        console.log('Retrying user fetch...');
        fetchUser();
      }
    }, 3000); // Retry after 3 seconds
    
    return () => clearTimeout(retryTimeout);
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    try {
      if (!user || !token) return false;

      const response = await fetch(API_ENDPOINTS.profile.update, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(prevUser => prevUser ? { ...prevUser, ...updatedUser } : null);
        // Refetch the user data to ensure we have the most up-to-date information
        setTimeout(() => fetchUser(), 500);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}; 