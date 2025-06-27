
import React, { useState } from 'react';
import { useCrudOperations } from '@/hooks/useCrudOperations';
import { useProcessData } from '@/hooks/useProcessData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProcessHeader from '@/components/process/ProcessHeader';
import ProcessManagement from '@/components/process/ProcessManagement';
import ProcessTracker from '@/components/process/ProcessTracker';
import ProcessModals from '@/components/process/ProcessModals';

const Processos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterResponsavel, setFilterResponsavel] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  const { processos, handleSaveProcess, handleDeleteProcess } = useProcessData();

  const filteredProcessos = processos.filter(processo => {
    const matchesSearch = processo.numero.includes(searchTerm) ||
                         processo.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         processo.assunto.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesArea = filterArea === '' || processo.area === filterArea;
    const matchesStatus = filterStatus === '' || processo.status === filterStatus;
    const matchesResponsavel = filterResponsavel === '' || processo.responsavel === filterResponsavel;
    
    return matchesSearch && matchesArea && matchesStatus && matchesResponsavel;
  });

  const areas = [...new Set(processos.map(p => p.area))];
  const responsaveis = [...new Set(processos.map(p => p.responsavel))];

  const onSaveProcess = (processData: any) => {
    handleSaveProcess(processData, selectedItem, () => setIsAddModalOpen(false), closeModals);
  };

  const onConfirmDelete = () => {
    confirmDelete(handleDeleteProcess, 'Processo');
  };

  return (
    <div>
      <ProcessHeader onNewProcess={() => setIsAddModalOpen(true)} />

      <Tabs defaultValue="gerenciar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="gerenciar">Gerenciar Processos</TabsTrigger>
          <TabsTrigger value="acompanhar">Acompanhar Processo</TabsTrigger>
        </TabsList>

        <TabsContent value="gerenciar" className="space-y-6">
          <ProcessManagement
            processos={processos}
            filteredProcessos={filteredProcessos}
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
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="acompanhar">
          <ProcessTracker />
        </TabsContent>
      </Tabs>

      <ProcessModals
        isAddModalOpen={isAddModalOpen}
        isEditModalOpen={isEditModalOpen}
        isViewModalOpen={isViewModalOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        selectedItem={selectedItem}
        onCloseAdd={() => setIsAddModalOpen(false)}
        onCloseModals={closeModals}
        onSaveProcess={onSaveProcess}
        onConfirmDelete={onConfirmDelete}
      />
    </div>
  );
};

export default Processos;
