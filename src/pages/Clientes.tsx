
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Eye, Edit, Trash2, User, Building, Phone, Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useCrudOperations } from '@/hooks/useCrudOperations';
import ClientModal from '@/components/modals/ClientModal';
import ClientViewModal from '@/components/modals/ClientViewModal';
import DeleteConfirmationDialog from '@/components/ui/delete-confirmation-dialog';

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
    setIsEditModalOpen,
  } = useCrudOperations();

  // Mock data - em produção viria de uma API ou estado global
  const [clientes, setClientes] = useState([
    {
      id: '1',
      name: 'Maria Silva Santos',
      personType: 'fisica',
      document: '123.456.789-00',
      email: 'maria@email.com',
      phone: '(11) 99999-9999',
      status: 'ativo',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      priority: 'normal',
      origin: 'Indicação',
      observations: 'Cliente muito pontual e organizada'
    },
    {
      id: '2',
      name: 'Empresa ABC Ltda.',
      personType: 'juridica',
      document: '12.345.678/0001-90',
      email: 'contato@empresaabc.com',
      phone: '(11) 3333-4444',
      status: 'ativo',
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      priority: 'alta',
      origin: 'Website',
      fantasyName: 'ABC Soluções'
    }
  ]);

  const filteredClientes = clientes.filter(cliente =>
    cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.document.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveClient = (clientData: any) => {
    if (selectedItem) {
      // Editando cliente existente
      setClientes(prev => prev.map(c => 
        c.id === selectedItem.id ? { ...c, ...clientData } : c
      ));
      toast({
        title: "Cliente atualizado!",
        description: "As informações do cliente foram atualizadas com sucesso.",
      });
    } else {
      // Adicionando novo cliente
      const newClient = {
        ...clientData,
        id: Date.now().toString(),
      };
      setClientes(prev => [...prev, newClient]);
      toast({
        title: "Cliente cadastrado!",
        description: "Novo cliente foi adicionado com sucesso.",
      });
    }
    setIsAddModalOpen(false);
    closeModals();
  };

  const handleDeleteClient = (id: string) => {
    setClientes(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gestão de Clientes</h1>
          <p className="text-gray-400">Gerencie informações completas dos seus clientes</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-hover text-white"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} className="mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{clientes.length}</div>
              <div className="text-gray-400 text-sm">Total de Clientes</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {clientes.filter(c => c.status === 'ativo').length}
              </div>
              <div className="text-gray-400 text-sm">Clientes Ativos</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {clientes.filter(c => c.personType === 'fisica').length}
              </div>
              <div className="text-gray-400 text-sm">Pessoas Físicas</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {clientes.filter(c => c.personType === 'juridica').length}
              </div>
              <div className="text-gray-400 text-sm">Pessoas Jurídicas</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Busca */}
      <Card className="bg-dark-card border-gray-800 mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Buscar por nome, documento ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClientes.map((cliente) => (
              <div
                key={cliente.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {cliente.personType === 'fisica' ? (
                      <User size={20} className="text-blue-400" />
                    ) : (
                      <Building size={20} className="text-green-400" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-medium">{cliente.name}</h3>
                      <Badge variant={cliente.personType === 'fisica' ? 'default' : 'secondary'}>
                        {cliente.personType === 'fisica' ? 'PF' : 'PJ'}
                      </Badge>
                      <Badge variant={cliente.status === 'ativo' ? 'default' : 'secondary'}>
                        {cliente.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                      <span>{cliente.document}</span>
                      <div className="flex items-center">
                        <Mail size={14} className="mr-1" />
                        {cliente.email}
                      </div>
                      <div className="flex items-center">
                        <Phone size={14} className="mr-1" />
                        {cliente.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(cliente)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(cliente)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(cliente)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredClientes.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">Nenhum cliente encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <ClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveClient}
      />

      <ClientModal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        onSave={handleSaveClient}
      />

      <ClientViewModal
        isOpen={isViewModalOpen}
        onClose={closeModals}
        client={selectedItem}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeModals}
        onConfirm={() => confirmDelete(handleDeleteClient, 'Cliente')}
        itemName="cliente"
      />
    </div>
  );
};

export default Clientes;
