
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, User, Mail, Phone, Calendar, MapPin, Shield, Award } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Equipe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const membros = [
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
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
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
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6a7c7e0?w=100&h=100&fit=crop&crop=face'
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
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
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
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const filteredMembros = membros.filter(membro =>
    membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    membro.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    membro.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovoMembro = () => {
    toast({
      title: "Em desenvolvimento",
      description: "Funcionalidade será implementada em breve.",
    });
  };

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
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Equipe</h1>
          <p className="text-gray-400">Gerencie a equipe do escritório e suas atividades</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-hover text-white"
          onClick={handleNovoMembro}
        >
          <Plus size={16} className="mr-2" />
          Novo Membro
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-white">{membros.length}</div>
          <div className="text-gray-400 text-sm">Total da Equipe</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-blue-400">{membros.filter(m => m.cargo.includes('Advogad')).length}</div>
          <div className="text-gray-400 text-sm">Advogados</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-green-400">{membros.filter(m => m.status === 'Ativo').length}</div>
          <div className="text-gray-400 text-sm">Ativos</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-purple-400">{membros.reduce((sum, m) => sum + m.casos, 0)}</div>
          <div className="text-gray-400 text-sm">Casos Ativos</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar membros da equipe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Filter size={16} className="mr-2" />
              Filtros
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              Relatório
            </Button>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembros.map((membro) => (
          <div key={membro.id} className="bg-dark-card rounded-lg p-6 border border-gray-800 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    src={membro.avatar}
                    alt={membro.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{membro.nome}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCargoColor(membro.cargo)}`}>
                    {membro.cargo}
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
                <span className="text-sm">{membro.especialidade}</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Mail size={14} className="mr-2 text-gray-400" />
                <span className="text-sm">{membro.email}</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Phone size={14} className="mr-2 text-gray-400" />
                <span className="text-sm">{membro.telefone}</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Calendar size={14} className="mr-2 text-gray-400" />
                <span className="text-sm">
                  Admitido em {new Date(membro.dataAdmissao).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">{membro.casos}</div>
                  <div className="text-xs text-gray-400">Casos Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-400">{membro.taxa}</div>
                  <div className="text-xs text-gray-400">Taxa/Hora</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-gray-700 text-gray-300">
                  Ver Perfil
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-gray-700 text-gray-300">
                  Editar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMembros.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">Nenhum membro encontrado</p>
        </div>
      )}
    </div>
  );
};

export default Equipe;
