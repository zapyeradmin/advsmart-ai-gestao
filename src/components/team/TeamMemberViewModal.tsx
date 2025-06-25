
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, Award, Shield } from 'lucide-react';
import { UserRole, rolePermissions } from '@/types/auth';

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
  customPermissions?: Partial<Record<keyof typeof rolePermissions.admin, boolean>>;
}

interface TeamMemberViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: ExtendedTeamMember | null;
}

const TeamMemberViewModal = ({ isOpen, onClose, member }: TeamMemberViewModalProps) => {
  if (!member) return null;

  const permissions = member.customPermissions 
    ? { ...rolePermissions[member.role], ...member.customPermissions }
    : rolePermissions[member.role];

  const getCargoColor = (cargo: string) => {
    switch (cargo) {
      case 'Advogado Sênior':
        return 'bg-purple-900/50 text-purple-400';
      case 'Advogada Plena':
        return 'bg-blue-900/50 text-blue-400';
      case 'Estagiário':
        return 'bg-green-900/50 text-green-400';
      case 'Secretária Jurídica':
        return 'bg-yellow-900/50 text-yellow-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-card border-gray-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-3">
            <User size={20} />
            Perfil do Membro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com foto e info básica */}
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={member.avatar}
                alt={member.nome}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">{member.nome}</h3>
              <Badge className={`mt-1 ${getCargoColor(member.cargo)}`}>
                {member.cargo}
              </Badge>
              <p className="text-gray-400 mt-2">Role: <span className="capitalize">{member.role}</span></p>
            </div>
          </div>

          {/* Informações de contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Award size={16} className="mr-3 text-gray-400" />
                <span>{member.especialidade}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail size={16} className="mr-3 text-gray-400" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="mr-3 text-gray-400" />
                <span>{member.telefone}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Calendar size={16} className="mr-3 text-gray-400" />
                <span>Admitido em {new Date(member.dataAdmissao).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="text-center p-3 bg-gray-800 rounded-lg">
                <div className="text-lg font-semibold text-white">{member.casos}</div>
                <div className="text-xs text-gray-400">Casos Ativos</div>
              </div>
              <div className="text-center p-3 bg-gray-800 rounded-lg">
                <div className="text-lg font-semibold text-green-400">{member.taxa}</div>
                <div className="text-xs text-gray-400">Taxa/Hora</div>
              </div>
            </div>
          </div>

          {/* Permissões */}
          <div>
            <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Shield size={18} />
              Permissões do Sistema
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(permissions).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                  <span className="text-sm text-gray-300 capitalize">
                    {key.replace('can', '').replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                  <Badge variant={value ? "default" : "secondary"}>
                    {value ? "Permitido" : "Negado"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberViewModal;
