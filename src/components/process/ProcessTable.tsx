
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import ProcessTableRow from './ProcessTableRow';

interface ProcessTableProps {
  filteredProcessos: any[];
  processos: any[];
}

const ProcessTable = ({ filteredProcessos, processos }: ProcessTableProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Em Andamento': return <Clock size={12} className="text-blue-400" />;
      case 'Aguardando': return <AlertTriangle size={12} className="text-yellow-400" />;
      case 'Finalizado': return <CheckCircle size={12} className="text-green-400" />;
      default: return <Clock size={12} className="text-gray-400" />;
    }
  };

  const getPriorityColor = (urgencia: string) => {
    switch (urgencia) {
      case 'Urgente': return 'text-red-400';
      case 'Alta': return 'text-orange-400';
      case 'Normal': return 'text-green-400';
      case 'Baixa': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      <div className="bg-dark-card rounded-lg border border-gray-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Processo</th>
                <th className="text-left p-4 text-gray-300 font-medium">Cliente</th>
                <th className="text-left p-4 text-gray-300 font-medium">Área & Instância</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Responsável</th>
                <th className="text-left p-4 text-gray-300 font-medium">Prazos & Datas</th>
                <th className="text-left p-4 text-gray-300 font-medium">Andamentos</th>
                <th className="text-center p-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcessos.map((processo) => (
                <ProcessTableRow
                  key={processo.id}
                  processo={processo}
                  getStatusIcon={getStatusIcon}
                  getPriorityColor={getPriorityColor}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredProcessos.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">Nenhum processo encontrado</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-400">
          Mostrando {filteredProcessos.length} de {processos.length} processos
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
    </>
  );
};

export default ProcessTable;
