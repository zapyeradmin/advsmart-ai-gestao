import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useCrudOperations } from '@/hooks/useCrudOperations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProcessModal from '@/components/modals/ProcessModal';
import ProcessViewModal from '@/components/modals/ProcessViewModal';
import DeleteConfirmationDialog from '@/components/ui/delete-confirmation-dialog';
import ProcessFilters from '@/components/process/ProcessFilters';
import ProcessStats from '@/components/process/ProcessStats';
import ProcessTable from '@/components/process/ProcessTable';
import ProcessTracker from '@/components/process/ProcessTracker';

const Processos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterResponsavel, setFilterResponsavel] = useState('');
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
  } = useCrudOperations();

  const [processos, setProcessos] = useState([
    {
      id: 1,
      numero: '0001234-12.2023.8.26.0100',
      cliente: 'Maria Silva Santos',
      clienteId: '1',
      clienteTipo: 'PF',
      area: 'Trabalhista',
      instancia: '1ª Instância',
      comarca: 'São Paulo',
      vara: '3ª Vara do Trabalho',
      assunto: 'Rescisão Indireta de Contrato de Trabalho',
      status: 'Em Andamento',
      responsavel: 'Dr. Ricardo Oliveira',
      valorCausa: 'R$ 15.000,00',
      dataDistribuicao: '2023-10-15',
      proximoPrazo: '2024-01-20',
      proximaAudiencia: '2024-01-25',
      urgencia: 'Normal',
      andamentos: 12,
      ultimoAndamento: '2023-12-08',
      observacoes: 'Cliente busca indenização por danos morais'
    },
    {
      id: 2,
      numero: '0005678-45.2023.8.26.0100',
      cliente: 'Empresa ABC Ltda.',
      clienteId: '2',
      clienteTipo: 'PJ',
      area: 'Empresarial',
      instancia: '1ª Instância',
      comarca: 'São Paulo',
      vara: '1ª Vara Empresarial',
      assunto: 'Dissolução Parcial de Sociedade',
      status: 'Aguardando',
      responsavel: 'Dra. Camila Santos',
      valorCausa: 'R$ 50.000,00',
      dataDistribuicao: '2023-11-02',
      proximoPrazo: '2024-01-15',
      proximaAudiencia: null,
      urgencia: 'Alta',
      andamentos: 8,
      ultimoAndamento: '2023-12-10',
      observacoes: 'Aguardando documentação complementar'
    },
    {
      id: 3,
      numero: '0009876-54.2023.8.26.0100',
      cliente: 'João Carlos Mendes',
      clienteId: '3',
      clienteTipo: 'PF',
      area: 'Cível',
      instancia: '1ª Instância',
      comarca: 'Guarulhos',
      vara: '2ª Vara Cível',
      assunto: 'Indenização por Danos Morais e Materiais',
      status: 'Finalizado',
      responsavel: 'Dr. Ricardo Oliveira',
      valorCausa: 'R$ 25.000,00',
      dataDistribuicao: '2023-09-20',
      proximoPrazo: null,
      proximaAudiencia: null,
      urgencia: 'Normal',
      andamentos: 25,
      ultimoAndamento: '2023-12-01',
      observacoes: 'Processo finalizado com acordo'
    }
  ]);

  const filteredProcessos = processos.filter(processo => {
    const matchesSearch = processo.numero.includes(searchTerm) ||
                         processo.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         processo.assunto.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesArea = filterArea === '' || processo.area === filterArea;
    const matchesStatus = filterStatus === '' || processo.status === filterStatus;
    const matchesResponsavel = filterResponsavel === '' || processo.responsavel === filterResponsavel;
    
    return matchesSearch && matchesArea && matchesStatus && matchesResponsavel;
  });

  const handleSaveProcess = (processData: any) => {
    if (selectedItem) {
      // Editando processo existente
      setProcessos(prev => prev.map(p => 
        p.id === selectedItem.id ? { ...p, ...processData } : p
      ));
      toast({
        title: "Processo atualizado!",
        description: "As informações do processo foram atualizadas com sucesso.",
      });
    } else {
      // Adicionando novo processo
      const newProcess = {
        ...processData,
        id: Date.now(),
        andamentos: 0,
        ultimoAndamento: new Date().toISOString(),
      };
      setProcessos(prev => [...prev, newProcess]);
      toast({
        title: "Processo cadastrado!",
        description: "Novo processo foi adicionado com sucesso.",
      });
    }
    setIsAddModalOpen(false);
    closeModals();
  };

  const handleDeleteProcess = (id: string) => {
    setProcessos(prev => prev.filter(p => p.id.toString() !== id));
  };

  const areas = [...new Set(processos.map(p => p.area))];
  const responsaveis = [...new Set(processos.map(p => p.responsavel))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Acompanhamento Processual</h1>
          <p className="text-gray-400">Gerencie processos jurídicos com integração completa aos clientes</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-hover text-white"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} className="mr-2" />
          Novo Processo
        </Button>
      </div>

      <Tabs defaultValue="gerenciar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="gerenciar">Gerenciar Processos</TabsTrigger>
          <TabsTrigger value="acompanhar">Acompanhar Processo</TabsTrigger>
        </TabsList>

        <TabsContent value="gerenciar" className="space-y-6">
          <ProcessStats processos={processos} />

          <ProcessFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterArea={filterArea}
            setFilterArea={setFilterArea}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterResponsavel={filterResponsavel}
            setFilterResponsavel={setFilterResponsavel}
            areas={areas}
            responsaveis={responsaveis}
          />

          <ProcessTable
            filteredProcessos={filteredProcessos}
            processos={processos}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="acompanhar">
          <ProcessTracker />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ProcessModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveProcess}
      />

      <ProcessModal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        onSave={handleSaveProcess}
      />

      <ProcessViewModal
        isOpen={isViewModalOpen}
        onClose={closeModals}
        process={selectedItem}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeModals}
        onConfirm={() => confirmDelete(handleDeleteProcess, 'Processo')}
        itemName="processo"
        description="Tem certeza que deseja excluir este processo? Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos."
      />
    </div>
  );
};

export default Processos;
