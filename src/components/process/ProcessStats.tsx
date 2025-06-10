
import React from 'react';
import { FileText, Clock, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';

interface ProcessStatsProps {
  processos: any[];
}

const ProcessStats = ({ processos }: ProcessStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="flex items-center">
          <FileText className="text-primary mr-2" size={20} />
          <div>
            <div className="text-2xl font-bold text-white">{processos.length}</div>
            <div className="text-gray-400 text-sm">Total de Processos</div>
          </div>
        </div>
      </div>
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="flex items-center">
          <Clock className="text-blue-400 mr-2" size={20} />
          <div>
            <div className="text-2xl font-bold text-blue-400">{processos.filter(p => p.status === 'Em Andamento').length}</div>
            <div className="text-gray-400 text-sm">Em Andamento</div>
          </div>
        </div>
      </div>
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="flex items-center">
          <AlertTriangle className="text-yellow-400 mr-2" size={20} />
          <div>
            <div className="text-2xl font-bold text-yellow-400">{processos.filter(p => p.status === 'Aguardando').length}</div>
            <div className="text-gray-400 text-sm">Aguardando</div>
          </div>
        </div>
      </div>
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="flex items-center">
          <CheckCircle className="text-green-400 mr-2" size={20} />
          <div>
            <div className="text-2xl font-bold text-green-400">{processos.filter(p => p.status === 'Finalizado').length}</div>
            <div className="text-gray-400 text-sm">Finalizados</div>
          </div>
        </div>
      </div>
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="flex items-center">
          <Calendar className="text-purple-400 mr-2" size={20} />
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {processos.filter(p => p.proximoPrazo && new Date(p.proximoPrazo) <= new Date(Date.now() + 7*24*60*60*1000)).length}
            </div>
            <div className="text-gray-400 text-sm">Prazos em 7 dias</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessStats;
