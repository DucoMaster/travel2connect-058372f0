
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('traveler-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API
      // For now, we'll just simulate a login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user
      const newUser: User = {
        id: '1',
        email,
        role: 'traveler',
        credits: 100,
        ranking: 5,
        createdAt: new Date()
      };
      
      setUser(newUser);
      localStorage.setItem('traveler-user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API
      // For now, we'll just simulate registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user
      const newUser: User = {
        id: '1',
        email,
        role,
        credits: 100, // All new users get 100 credits
        ranking: 5,   // All new users start with 5-star ranking
        createdAt: new Date()
      };
      
      setUser(newUser);
      localStorage.setItem('traveler-user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('traveler-user');
  };

  const value = {
    user,
    setUser,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
