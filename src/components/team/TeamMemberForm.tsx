
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PermissionGuard from '@/components/auth/PermissionGuard';

interface TeamMemberFormData {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  especialidade: string;
  taxa: string;
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

  return (
    <PermissionGuard permission="canManageUsers">
      <div className="bg-dark-card rounded-lg p-6 border border-gray-800 mb-6">
        <h3 className="text-lg font-medium text-white mb-4">Adicionar Novo Membro</h3>
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
            placeholder="Telefone"
            value={formData.telefone}
            onChange={(e) => handleInputChange('telefone', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
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
        </div>
        <div className="flex gap-2 mt-4">
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
    </PermissionGuard>
  );
};

export default TeamMemberForm;
