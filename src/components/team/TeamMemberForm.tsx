
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRole, UserPermissions } from '@/types/auth';
import PermissionGuard from '@/components/auth/PermissionGuard';
import PermissionsSelector from './PermissionsSelector';

interface TeamMemberFormData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cargo: string;
  especialidade: string;
  taxa: string;
  role: UserRole;
  customPermissions: Partial<UserPermissions>;
}

interface TeamMemberFormProps {
  formData: TeamMemberFormData;
  onFormDataChange: (data: TeamMemberFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const TeamMemberForm = ({ formData, onFormDataChange, onSubmit, onCancel }: TeamMemberFormProps) => {
  const handleInputChange = (field: keyof TeamMemberFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const handlePermissionChange = (permission: keyof UserPermissions, value: boolean) => {
    onFormDataChange({
      ...formData,
      customPermissions: {
        ...formData.customPermissions,
        [permission]: value
      }
    });
  };

  return (
    <PermissionGuard permission="canManageUsers">
      <div className="bg-dark-card rounded-lg p-6 border border-gray-800 mb-6">
        <h3 className="text-lg font-medium text-white mb-4">Adicionar Novo Membro</h3>
        
        <div className="space-y-6">
          {/* Informações Básicas */}
          <div>
            <h4 className="text-md font-medium text-gray-300 mb-3">Informações Pessoais</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Nome completo"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                placeholder="Senha para login"
                type="password"
                value={formData.senha}
                onChange={(e) => handleInputChange('senha', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                placeholder="Telefone"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Informações Profissionais */}
          <div>
            <h4 className="text-md font-medium text-gray-300 mb-3">Informações Profissionais</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.cargo}
                onChange={(e) => handleInputChange('cargo', e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
              >
                <option value="">Selecione o cargo</option>
                <option value="Advogado Sênior">Advogado Sênior</option>
                <option value="Advogado Pleno">Advogado Pleno</option>
                <option value="Advogado Júnior">Advogado Júnior</option>
                <option value="Estagiário">Estagiário</option>
                <option value="Secretária Jurídica">Secretária Jurídica</option>
              </select>
              <Input
                placeholder="Especialidade"
                value={formData.especialidade}
                onChange={(e) => handleInputChange('especialidade', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                placeholder="Taxa por hora (ex: R$ 300)"
                value={formData.taxa}
                onChange={(e) => handleInputChange('taxa', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value as UserRole)}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
              >
                <option value="estagiario">Estagiário</option>
                <option value="secretario">Secretário</option>
                <option value="advogado">Advogado</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>

          {/* Permissões */}
          <div>
            <h4 className="text-md font-medium text-gray-300 mb-3">Permissões do Sistema</h4>
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
              <PermissionsSelector
                role={formData.role}
                customPermissions={formData.customPermissions}
                onPermissionChange={handlePermissionChange}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-gray-700">
            <Button onClick={onSubmit} className="bg-primary hover:bg-primary-hover">
              Adicionar Membro
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-gray-700 text-gray-300"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
};

export default TeamMemberForm;
