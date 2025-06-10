
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Phone, Mail, Users, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import ClientModal from '@/components/modals/ClientModal';
import { useToast } from "@/hooks/use-toast";

const Clientes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrigin, setFilterOrigin] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const { toast } = useToast();

  const clientes = [
    {
      id: 1,
      name: 'Maria Silva Santos',
      type: 'Pessoa Física',
      document: '123.456.789-00',
      email: 'maria.silva@email.com',
      phone: '(11) 99999-9999',
      status: 'Ativo',
      processes: 3,
      totalValue: 'R$ 15.500,00',
      lastContact: '2023-12-08',
      origin: 'Indicação de Cliente',
      referredBy: 'João Carlos Mendes',
      priority: 'alta',
      tags: ['VIP', 'Trabalhista'],
      interactions: 15
    },
    {
      id: 2,
      name: 'Empresa ABC Ltda.',
      type: 'Pessoa Jurídica',
      document: '12.345.678/0001-90',
      email: 'contato@empresaabc.com.br',
      phone: '(11) 3333-4444',
      status: 'Ativo',
      processes: 1,
      totalValue: 'R$ 25.000,00',
      lastContact: '2023-12-10',
      origin: 'Site/Internet',
      referredBy: '',
      priority: 'normal',
      tags: ['Empresarial', 'Previdenciário'],
      interactions: 8
    },
    {
      id: 3,
      name: 'João Carlos Mendes',
      type: 'Pessoa Física',
      document: '987.654.321-00',
      email: 'joao.mendes@email.com',
      phone: '(11) 88888-7777',
      status: 'Prospecto',
      processes: 0,
      totalValue: 'R$ 0,00',
      lastContact: '2023-11-15',
      origin: 'Redes Sociais',
      referredBy: '',
      priority: 'normal',
      tags: ['Prospecto'],
      interactions: 3
    }
  ];

  const handleSaveClient = (clientData: any) => {
    console.log('Novo cliente:', clientData);
    toast({
      title: "Sucesso!",
      description: "Cliente cadastrado com sucesso.",
    });
  };

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.document.includes(searchTerm) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesOrigin = filterOrigin === '' || cliente.origin === filterOrigin;
    const matchesStatus = filterStatus === '' || cliente.status === filterStatus;
    
    return matchesSearch && matchesOrigin && matchesStatus;
  });

  const originStats = clientes.reduce((acc, cliente) => {
    acc[cliente.origin] = (acc[cliente.origin] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgente': return 'text-red-400';
      case 'alta': return 'text-orange-400';
      case 'normal': return 'text-green-400';
      case 'baixa': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gestão de Clientes</h1>
          <p className="text-gray-400">Gerencie seus clientes com formulários detalhados e sistema de origem</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-hover text-white"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} className="mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <Users className="text-primary mr-2" size={20} />
            <div>
              <div className="text-2xl font-bold text-white">{clientes.length}</div>
              <div className="text-gray-400 text-sm">Total de Clientes</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <TrendingUp className="text-green-400 mr-2" size={20} />
            <div>
              <div className="text-2xl font-bold text-green-400">{clientes.filter(c => c.status === 'Ativo').length}</div>
              <div className="text-gray-400 text-sm">Clientes Ativos</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <Calendar className="text-yellow-400 mr-2" size={20} />
            <div>
              <div className="text-2xl font-bold text-yellow-400">{clientes.filter(c => c.status === 'Prospecto').length}</div>
              <div className="text-gray-400 text-sm">Prospectos</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <MessageSquare className="text-blue-400 mr-2" size={20} />
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {clientes.reduce((total, cliente) => total + cliente.interactions, 0)}
              </div>
              <div className="text-gray-400 text-sm">Total Interações</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                R$ {clientes.reduce((total, cliente) => total + parseFloat(cliente.totalValue.replace(/[R$\s.]/g, '').replace(',', '.')), 0).toLocaleString('pt-BR')}
              </div>
              <div className="text-gray-400 text-sm">Valor Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar por nome, documento ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterOrigin}
              onChange={(e) => setFilterOrigin(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
            >
              <option value="">Todas as Origens</option>
              <option value="Indicação de Cliente">Indicação de Cliente</option>
              <option value="Site/Internet">Site/Internet</option>
              <option value="Redes Sociais">Redes Sociais</option>
              <option value="Marketing Digital">Marketing Digital</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
            >
              <option value="">Todos os Status</option>
              <option value="Ativo">Ativo</option>
              <option value="Prospecto">Prospecto</option>
              <option value="Inativo">Inativo</option>
            </select>

            <Button variant="outline" className="border-gray-700 text-gray-300">
              Exportar
            </Button>
          </div>
        </div>

        {/* Origin Stats */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Distribuição por Origem:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(originStats).map(([origin, count]) => (
              <span key={origin} className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                {origin}: {count}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-dark-card rounded-lg border border-gray-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Cliente</th>
                <th className="text-left p-4 text-gray-300 font-medium">Documento</th>
                <th className="text-left p-4 text-gray-300 font-medium">Contato</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Origem</th>
                <th className="text-left p-4 text-gray-300 font-medium">Processos</th>
                <th className="text-left p-4 text-gray-300 font-medium">Interações</th>
                <th className="text-left p-4 text-gray-300 font-medium">Valor Total</th>
                <th className="text-center p-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                  <td className="p-4">
                    <div>
                      <div className="flex items-center">
                        <div className="font-medium text-white">{cliente.name}</div>
                        <div className={`ml-2 w-2 h-2 rounded-full ${getPriorityColor(cliente.priority)}`}></div>
                      </div>
                      <div className="text-sm text-gray-400">{cliente.type}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cliente.tags.map((tag, index) => (
                          <span key={index} className="bg-primary/20 text-primary text-xs px-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{cliente.document}</td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-300">
                        <Mail size={12} className="mr-1" />
                        {cliente.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Phone size={12} className="mr-1" />
                        {cliente.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cliente.status === 'Ativo' 
                        ? 'bg-green-900/50 text-green-400' 
                        : cliente.status === 'Prospecto'
                        ? 'bg-yellow-900/50 text-yellow-400'
                        : 'bg-gray-900/50 text-gray-400'
                    }`}>
                      {cliente.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-300">{cliente.origin}</div>
                    {cliente.referredBy && (
                      <div className="text-xs text-gray-500">Por: {cliente.referredBy}</div>
                    )}
                  </td>
                  <td className="p-4 text-gray-300">{cliente.processes}</td>
                  <td className="p-4">
                    <div className="text-gray-300">{cliente.interactions}</div>
                    <div className="text-xs text-gray-500">interações</div>
                  </td>
                  <td className="p-4 text-gray-300">{cliente.totalValue}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MessageSquare size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClientes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">Nenhum cliente encontrado</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-400">
          Mostrando {filteredClientes.length} de {clientes.length} clientes
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
            1
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
            Próximo
          </Button>
        </div>
      </div>

      {/* Client Modal */}
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveClient}
      />
    </div>
  );
};

export default Clientes;
