
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPermissions, UserRole } from '@/types/auth';
import { useToast } from "@/hooks/use-toast";
import PermissionsSelector from './PermissionsSelector';
import PermissionGuard from '@/components/auth/PermissionGuard';

interface ExtendedTeamMember {
  id: number;
  nome: string;
  role: UserRole;
  customPermissions?: Partial<UserPermissions>;
}

interface TeamMemberPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: ExtendedTeamMember | null;
  onSave: (memberId: number, permissions: Partial<UserPermissions>) => void;
}

const TeamMemberPermissionsModal = ({ isOpen, onClose, member, onSave }: TeamMemberPermissionsModalProps) => {
  const { toast } = useToast();
  const [customPermissions, setCustomPermissions] = useState<Partial<UserPermissions>>({});

  useEffect(() => {
    if (member) {
      setCustomPermissions(member.customPermissions || {});
    }
  }, [member]);

  const handlePermissionChange = (permission: keyof UserPermissions, value: boolean) => {
    setCustomPermissions(prev => ({
      ...prev,
      [permission]: value
    }));
  };

  const handleSave = () => {
    if (!member) return;

    onSave(member.id, customPermissions);
    toast({
      title: "Sucesso",
      description: "Permissões atualizadas com sucesso.",
    });
    onClose();
  };

  const handleReset = () => {
    setCustomPermissions({});
    toast({
      title: "Permissões resetadas",
      description: "Permissões retornaram ao padrão do role.",
    });
  };

  if (!member) return null;

  return (
    <PermissionGuard permission="canManageUsers">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-dark-card border-gray-800 max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              Gerenciar Permissões - {member.nome}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <PermissionsSelector
              role={member.role}
              customPermissions={customPermissions}
              onPermissionChange={handlePermissionChange}
            />

            <div className="flex gap-3 pt-4 border-t border-gray-700">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover">
                Salvar Permissões
              </Button>
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="border-gray-700 text-gray-300"
              >
                Resetar para Padrão
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-gray-700 text-gray-300"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  );
};

export default TeamMemberPermissionsModal;
