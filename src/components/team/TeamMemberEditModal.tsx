
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRole } from '@/types/auth';
import { useToast } from "@/hooks/use-toast";
import PermissionGuard from '@/components/auth/PermissionGuard';

interface ExtendedTeamMember {
  id: number;
  nome: string;
  cargo: string;
  especialidade: string;
  email: string;
  telefone: string;
  dataAdmissao: string;
  status: string;
  casos: number;
  taxa: string;
  avatar: string;
  role: UserRole;
  customPermissions?: Partial<Record<string, boolean>>;
}

interface TeamMemberEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: ExtendedTeamMember | null;
  onSave: (member: ExtendedTeamMember) => void;
}

const TeamMemberEditModal = ({ isOpen, onClose, member, onSave }: TeamMemberEditModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<ExtendedTeamMember>>({});

  useEffect(() => {
    if (member) {
      setFormData(member);
    }
  }, [member]);

  const handleInputChange = (field: keyof ExtendedTeamMember, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.nome || !formData.email) {
      toast({
        title: "Erro",
        description: "Nome e email são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData as ExtendedTeamMember);
    toast({
      title: "Sucesso",
      description: "Membro atualizado com sucesso.",
    });
    onClose();
  };

  if (!member) return null;

  return (
    <PermissionGuard permission="canManageUsers">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-dark-card border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Membro</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Nome completo"
                value={formData.nome || ''}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                placeholder="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                placeholder="Telefone"
                value={formData.telefone || ''}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <select
                value={formData.cargo || ''}
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
                value={formData.especialidade || ''}
                onChange={(e) => handleInputChange('especialidade', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                placeholder="Taxa por hora (ex: R$ 300)"
                value={formData.taxa || ''}
                onChange={(e) => handleInputChange('taxa', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role do Sistema
              </label>
              <select
                value={formData.role || 'estagiario'}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
              >
                <option value="admin">Administrador</option>
                <option value="advogado">Advogado</option>
                <option value="estagiario">Estagiário</option>
                <option value="secretario">Secretário</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover">
                Salvar Alterações
              </Button>
              <Button variant="outline" onClick={onClose} className="border-gray-700 text-gray-300">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  );
};

export default TeamMemberEditModal;
