
import React from 'react';
import ProcessStats from './ProcessStats';
import ProcessFilters from './ProcessFilters';
import ProcessTable from './ProcessTable';

interface ProcessManagementProps {
  processos: any[];
  filteredProcessos: any[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterArea: string;
  setFilterArea: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  filterResponsavel: string;
  setFilterResponsavel: (value: string) => void;
  areas: string[];
  responsaveis: string[];
  onView: (processo: any) => void;
  onEdit: (processo: any) => void;
  onDelete: (processo: any) => void;
}

const ProcessManagement = ({
  processos,
  filteredProcessos,
  searchTerm,
  setSearchTerm,
  filterArea,
  setFilterArea,
  filterStatus,
  setFilterStatus,
  filterResponsavel,
  setFilterResponsavel,
  areas,
  responsaveis,
  onView,
  onEdit,
  onDelete
}: ProcessManagementProps) => {
  return (
    <div className="space-y-6">
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
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ProcessManagement;
