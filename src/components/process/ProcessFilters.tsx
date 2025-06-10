
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from 'lucide-react';

interface ProcessFiltersProps {
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
}

const ProcessFilters = ({
  searchTerm,
  setSearchTerm,
  filterArea,
  setFilterArea,
  filterStatus,
  setFilterStatus,
  filterResponsavel,
  setFilterResponsavel,
  areas,
  responsaveis
}: ProcessFiltersProps) => {
  return (
    <div className="bg-dark-card rounded-lg p-4 border border-gray-800 shadow-lg mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Pesquisar por número, cliente ou assunto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
          >
            <option value="">Todas as Áreas</option>
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
          >
            <option value="">Todos os Status</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Aguardando">Aguardando</option>
            <option value="Suspenso">Suspenso</option>
            <option value="Finalizado">Finalizado</option>
          </select>

          <select
            value={filterResponsavel}
            onChange={(e) => setFilterResponsavel(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
          >
            <option value="">Todos os Responsáveis</option>
            {responsaveis.map(resp => (
              <option key={resp} value={resp}>{resp}</option>
            ))}
          </select>

          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Filter size={16} className="mr-2" />
            Mais Filtros
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300">
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProcessFilters;
