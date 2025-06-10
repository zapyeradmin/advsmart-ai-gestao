
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, UserPermissions, rolePermissions } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  permissions: UserPermissions;
  hasPermission: (permission: keyof UserPermissions) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Ricardo Oliveira',
    email: 'ricardo@advsmart.com',
    role: 'admin',
    avatar: '',
    createdAt: '2023-01-01',
    isActive: true,
  },
  {
    id: '2',
    name: 'Dra. Camila Santos',
    email: 'camila@advsmart.com',
    role: 'advogado',
    avatar: '',
    createdAt: '2023-01-01',
    isActive: true,
  },
  {
    id: '3',
    name: 'João Silva',
    email: 'joao@advsmart.com',
    role: 'estagiario',
    avatar: '',
    createdAt: '2023-01-01',
    isActive: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const permissions = user ? rolePermissions[user.role] : rolePermissions.estagiario;

  const hasPermission = (permission: keyof UserPermissions): boolean => {
    return permissions[permission];
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === '123456') {
      setUser(foundUser);
      localStorage.setItem('advsmart_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('advsmart_user');
  };

  useEffect(() => {
    // Check for stored user on app start
    const storedUser = localStorage.getItem('advsmart_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('advsmart_user');
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      permissions,
      hasPermission,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
