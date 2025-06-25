
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { UserRole, UserPermissions } from '@/types/auth';
import { useCrudOperations } from '@/hooks/useCrudOperations';
import PermissionGuard from '@/components/auth/PermissionGuard';
import TeamMemberForm from '@/components/team/TeamMemberForm';
import TeamStats from '@/components/team/TeamStats';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import TeamSearch from '@/components/team/TeamSearch';
import TeamMemberViewModal from '@/components/team/TeamMemberViewModal';
import TeamMemberEditModal from '@/components/team/TeamMemberEditModal';
import TeamMemberPermissionsModal from '@/components/team/TeamMemberPermissionsModal';
import DeleteConfirmationDialog from '@/components/ui/delete-confirmation-dialog';

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
  customPermissions?: Partial<UserPermissions>;
}

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

const Equipe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState<TeamMemberFormData>({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    cargo: '',
    especialidade: '',
    taxa: '',
    role: 'estagiario',
    customPermissions: {},
  });
  const { toast } = useToast();

  const {
    selectedItem,
    isViewModalOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    handleView,
    handleEdit,
    handleDelete,
    confirmDelete,
    closeModals,
  } = useCrudOperations();

  // Dados mockados com roles e permissões
  const [membros, setMembros] = useState<ExtendedTeamMember[]>([
    {
      id: 1,
      nome: 'Dr. Ricardo Oliveira',
      cargo: 'Advogado Sênior',
      especialidade: 'Direito Trabalhista',
      email: 'ricardo@advsmartai.com',
      telefone: '(11) 99999-1111',
      dataAdmissao: '2020-03-15',
      status: 'Ativo',
      casos: 45,
      taxa: 'R$ 300/hora',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      role: 'admin',
    },
    {
      id: 2,
      nome: 'Dra. Camila Santos',
      cargo: 'Advogada Plena',
      especialidade: 'Direito Empresarial',
      email: 'camila@advsmartai.com',
      telefone: '(11) 99999-2222',
      dataAdmissao: '2021-07-20',
      status: 'Ativo',
      casos: 32,
      taxa: 'R$ 250/hora',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6a7c7e0?w=100&h=100&fit=crop&crop=face',
      role: 'advogado',
    },
    {
      id: 3,
      nome: 'João Pedro Silva',
      cargo: 'Estagiário',
      especialidade: 'Direito Civil',
      email: 'joao@advsmartai.com',
      telefone: '(11) 99999-3333',
      dataAdmissao: '2023-02-01',
      status: 'Ativo',
      casos: 8,
      taxa: 'R$ 50/hora',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      role: 'estagiario',
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cargo: 'Secretária Jurídica',
      especialidade: 'Suporte Administrativo',
      email: 'ana@advsmartai.com',
      telefone: '(11) 99999-4444',
      dataAdmissao: '2022-01-10',
      status: 'Ativo',
      casos: 0,
      taxa: 'R$ 25/hora',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      role: 'secretario',
    }
  ]);

  const filteredMembros = membros.filter(membro =>
    membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    membro.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    membro.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = () => {
    if (!newMember.nome || !newMember.email || !newMember.senha || !newMember.cargo) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos nome, email, senha e cargo.",
        variant: "destructive",
      });
      return;
    }

    const novoMembro: ExtendedTeamMember = {
      id: Math.max(...membros.map(m => m.id)) + 1,
      nome: newMember.nome,
      cargo: newMember.cargo,
      especialidade: newMember.especialidade,
      email: newMember.email,
      telefone: newMember.telefone,
      dataAdmissao: new Date().toISOString(),
      status: 'Ativo',
      casos: 0,
      taxa: newMember.taxa,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      role: newMember.role,
      customPermissions: newMember.customPermissions,
    };

    setMembros([...membros, novoMembro]);

    toast({
      title: "Sucesso",
      description: "Membro adicionado com sucesso.",
    });

    setNewMember({
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      cargo: '',
      especialidade: '',
      taxa: '',
      role: 'estagiario',
      customPermissions: {},
    });
    setShowAddForm(false);
  };

  const handleEditMember = (updatedMember: ExtendedTeamMember) => {
    setMembros(membros.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  const handleDeleteMember = (id: number) => {
    setMembros(membros.filter(m => m.id !== id));
  };

  const handleManagePermissions = (member: ExtendedTeamMember) => {
    handleView(member);
    setIsPermissionsModalOpen(true);
  };

  const handleSavePermissions = (memberId: number, permissions: Partial<UserPermissions>) => {
    setMembros(membros.map(m => 
      m.id === memberId 
        ? { ...m, customPermissions: permissions }
        : m
    ));
    setIsPermissionsModalOpen(false);
    closeModals();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gestão de Equipe</h1>
          <p className="text-gray-400">Gerencie a equipe do escritório e suas atividades</p>
        </div>
        <PermissionGuard permission="canManageUsers">
          <Button
            className="bg-primary hover:bg-primary-hover text-white"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={16} className="mr-2" />
            {showAddForm ? 'Cancelar' : 'Novo Membro'}
          </Button>
        </PermissionGuard>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <TeamMemberForm
          formData={newMember}
          onFormDataChange={setNewMember}
          onSubmit={handleAddMember}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Stats Cards */}
      <TeamStats members={membros} />

      {/* Search */}
      <TeamSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembros.map((membro) => (
          <TeamMemberCard 
            key={membro.id} 
            member={membro} 
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onManagePermissions={handleManagePermissions}
          />
        ))}
      </div>

      {filteredMembros.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">Nenhum membro encontrado</p>
        </div>
      )}

      {/* Modals */}
      <TeamMemberViewModal
        isOpen={isViewModalOpen && !isPermissionsModalOpen}
        onClose={closeModals}
        member={selectedItem}
      />

      <TeamMemberEditModal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        member={selectedItem}
        onSave={handleEditMember}
      />

      <TeamMemberPermissionsModal
        isOpen={isPermissionsModalOpen}
        onClose={() => {
          setIsPermissionsModalOpen(false);
          closeModals();
        }}
        member={selectedItem}
        onSave={handleSavePermissions}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeModals}
        onConfirm={() => confirmDelete((id) => handleDeleteMember(Number(id)), 'membro')}
        itemName="membro da equipe"
      />
    </div>
  );
};

export default Equipe;
