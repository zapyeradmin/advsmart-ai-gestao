
import React from 'react';
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, Award, Edit, Trash2 } from 'lucide-react';
import PermissionGuard from '@/components/auth/PermissionGuard';

interface TeamMember {
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
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
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
    <div className="bg-dark-card rounded-lg p-6 border border-gray-800 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <img
              src={member.avatar}
              alt={member.nome}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{member.nome}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCargoColor(member.cargo)}`}>
              {member.cargo}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <User size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-300">
          <Award size={14} className="mr-2 text-gray-400" />
          <span className="text-sm">{member.especialidade}</span>
        </div>
        
        <div className="flex items-center text-gray-300">
          <Mail size={14} className="mr-2 text-gray-400" />
          <span className="text-sm">{member.email}</span>
        </div>
        
        <div className="flex items-center text-gray-300">
          <Phone size={14} className="mr-2 text-gray-400" />
          <span className="text-sm">{member.telefone}</span>
        </div>
        
        <div className="flex items-center text-gray-300">
          <Calendar size={14} className="mr-2 text-gray-400" />
          <span className="text-sm">
            Admitido em {new Date(member.dataAdmissao).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-white">{member.casos}</div>
            <div className="text-xs text-gray-400">Casos Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-400">{member.taxa}</div>
            <div className="text-xs text-gray-400">Taxa/Hora</div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 border-gray-700 text-gray-300">
            Ver Perfil
          </Button>
          <PermissionGuard permission="canManageUsers">
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              <Edit size={14} />
            </Button>
            <Button variant="outline" size="sm" className="border-red-700 text-red-400 hover:bg-red-900/20">
              <Trash2 size={14} />
            </Button>
          </PermissionGuard>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
