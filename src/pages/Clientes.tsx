
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Phone, Mail } from 'lucide-react';
import ClientModal from '@/components/modals/ClientModal';
import { useToast } from "@/hooks/use-toast";

const Clientes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
      lastContact: '2023-12-08'
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
      lastContact: '2023-12-10'
    },
    {
      id: 3,
      name: 'João Carlos Mendes',
      type: 'Pessoa Física',
      document: '987.654.321-00',
      email: 'joao.mendes@email.com',
      phone: '(11) 88888-7777',
      status: 'Inativo',
      processes: 2,
      totalValue: 'R$ 8.750,00',
      lastContact: '2023-11-15'
    }
  ];

  const handleSaveClient = (clientData: any) => {
    console.log('Novo cliente:', clientData);
    toast({
      title: "Sucesso!",
      description: "Cliente cadastrado com sucesso.",
    });
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.document.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Clientes</h1>
          <p className="text-gray-400">Gerencie seus clientes e mantenha suas informações atualizadas</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-hover text-white"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} className="mr-2" />
          Novo Cliente
        </Button>
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
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Filter size={16} className="mr-2" />
              Filtros
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-white">{clientes.length}</div>
          <div className="text-gray-400 text-sm">Total de Clientes</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-green-400">{clientes.filter(c => c.status === 'Ativo').length}</div>
          <div className="text-gray-400 text-sm">Clientes Ativos</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-yellow-400">{clientes.filter(c => c.status === 'Inativo').length}</div>
          <div className="text-gray-400 text-sm">Clientes Inativos</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-primary">
            R$ {clientes.reduce((total, cliente) => total + parseFloat(cliente.totalValue.replace(/[R$\s.]/g, '').replace(',', '.')), 0).toLocaleString('pt-BR')}
          </div>
          <div className="text-gray-400 text-sm">Valor Total</div>
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
                <th className="text-left p-4 text-gray-300 font-medium">Processos</th>
                <th className="text-left p-4 text-gray-300 font-medium">Valor Total</th>
                <th className="text-left p-4 text-gray-300 font-medium">Último Contato</th>
                <th className="text-center p-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">{cliente.name}</div>
                      <div className="text-sm text-gray-400">{cliente.type}</div>
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
                        : 'bg-gray-900/50 text-gray-400'
                    }`}>
                      {cliente.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{cliente.processes}</td>
                  <td className="p-4 text-gray-300">{cliente.totalValue}</td>
                  <td className="p-4 text-gray-300">{new Date(cliente.lastContact).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Edit size={14} />
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
