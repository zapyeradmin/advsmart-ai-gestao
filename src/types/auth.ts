
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

export type UserRole = 'admin' | 'advogado' | 'estagiario' | 'secretario';

export interface UserPermissions {
  canManageUsers: boolean;
  canManageClients: boolean;
  canManageProcesses: boolean;
  canViewFinancial: boolean;
  canManageDocuments: boolean;
  canViewReports: boolean;
  canManageSettings: boolean;
}

export const rolePermissions: Record<UserRole, UserPermissions> = {
  admin: {
    canManageUsers: true,
    canManageClients: true,
    canManageProcesses: true,
    canViewFinancial: true,
    canManageDocuments: true,
    canViewReports: true,
    canManageSettings: true,
  },
  advogado: {
    canManageUsers: false,
    canManageClients: true,
    canManageProcesses: true,
    canViewFinancial: true,
    canManageDocuments: true,
    canViewReports: true,
    canManageSettings: false,
  },
  estagiario: {
    canManageUsers: false,
    canManageClients: false,
    canManageProcesses: true,
    canViewFinancial: false,
    canManageDocuments: true,
    canViewReports: false,
    canManageSettings: false,
  },
  secretario: {
    canManageUsers: false,
    canManageClients: true,
    canManageProcesses: false,
    canViewFinancial: false,
    canManageDocuments: true,
    canViewReports: false,
    canManageSettings: false,
  },
};
