
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { rolePermissions, UserPermissions, UserRole } from '@/types/auth';

interface PermissionsSelectorProps {
  role: UserRole;
  customPermissions: Partial<UserPermissions>;
  onPermissionChange: (permission: keyof UserPermissions, value: boolean) => void;
}

const PermissionsSelector = ({ role, customPermissions, onPermissionChange }: PermissionsSelectorProps) => {
  const defaultPermissions = rolePermissions[role];

  const permissionLabels: Record<keyof UserPermissions, string> = {
    canManageUsers: 'Gerenciar Usuários',
    canManageClients: 'Gerenciar Clientes',
    canManageProcesses: 'Gerenciar Processos',
    canViewFinancial: 'Ver Financeiro',
    canManageDocuments: 'Gerenciar Documentos',
    canViewReports: 'Ver Relatórios',
    canManageSettings: 'Gerenciar Configurações',
  };

  const permissionDescriptions: Record<keyof UserPermissions, string> = {
    canManageUsers: 'Criar, editar e excluir usuários do sistema',
    canManageClients: 'Gerenciar cadastro e informações de clientes',
    canManageProcesses: 'Criar e gerenciar processos jurídicos',
    canViewFinancial: 'Visualizar informações financeiras',
    canManageDocuments: 'Upload e gestão de documentos',
    canViewReports: 'Acesso a relatórios e analytics',
    canManageSettings: 'Configurar preferências do sistema',
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-300 mb-2">
          Permissões Padrão do Role: <span className="capitalize text-white">{role}</span>
        </h4>
        <p className="text-xs text-gray-400">
          As permissões marcadas são personalizações que sobrepõem as permissões padrão do role.
        </p>
      </div>

      <div className="space-y-3">
        {Object.entries(permissionLabels).map(([key, label]) => {
          const permissionKey = key as keyof UserPermissions;
          const defaultValue = defaultPermissions[permissionKey];
          const customValue = customPermissions[permissionKey];
          const finalValue = customValue !== undefined ? customValue : defaultValue;
          const isCustomized = customValue !== undefined;

          return (
            <div key={key} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
              <Checkbox
                id={key}
                checked={finalValue}
                onCheckedChange={(checked) => onPermissionChange(permissionKey, checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor={key}
                  className={`text-sm font-medium cursor-pointer ${
                    isCustomized ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {label}
                  {isCustomized && <span className="ml-2 text-xs">(Personalizado)</span>}
                </label>
                <p className="text-xs text-gray-400 mt-1">
                  {permissionDescriptions[permissionKey]}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Padrão do role: {defaultValue ? 'Permitido' : 'Negado'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PermissionsSelector;
