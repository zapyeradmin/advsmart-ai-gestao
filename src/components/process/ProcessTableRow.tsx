
import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Calendar, Clock, User, Building, ExternalLink } from 'lucide-react';

interface ProcessTableRowProps {
  processo: any;
  getStatusIcon: (status: string) => JSX.Element;
  getPriorityColor: (urgencia: string) => string;
}

const ProcessTableRow = ({ processo, getStatusIcon, getPriorityColor }: ProcessTableRowProps) => {
  return (
    <tr className="border-t border-gray-700 hover:bg-gray-800/50">
      <td className="p-4">
        <div>
          <div className="flex items-center">
            <div className="font-mono text-sm text-white">{processo.numero}</div>
            <div className={`ml-2 w-2 h-2 rounded-full ${getPriorityColor(processo.urgencia)}`}></div>
          </div>
          <div className="text-xs text-gray-400 mt-1">{processo.assunto}</div>
          <div className="text-xs text-gray-500">{processo.comarca} • {processo.vara}</div>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center">
          {processo.clienteTipo === 'PF' ? 
            <User size={14} className="mr-1 text-blue-400" /> : 
            <Building size={14} className="mr-1 text-green-400" />
          }
          <div>
            <div className="text-white text-sm">{processo.cliente}</div>
            <div className="text-xs text-gray-400">{processo.clienteTipo}</div>
          </div>
        </div>
      </td>
      <td className="p-4">
        <div>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-400">
            {processo.area}
          </span>
          <div className="text-xs text-gray-400 mt-1">{processo.instancia}</div>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center">
          {getStatusIcon(processo.status)}
          <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
            processo.status === 'Em Andamento' 
              ? 'bg-blue-900/50 text-blue-400' 
              : processo.status === 'Aguardando'
              ? 'bg-yellow-900/50 text-yellow-400'
              : 'bg-green-900/50 text-green-400'
          }`}>
            {processo.status}
          </span>
        </div>
      </td>
      <td className="p-4">
        <div className="text-gray-300 text-sm">{processo.responsavel}</div>
        <div className="text-xs text-gray-500">Valor: {processo.valorCausa}</div>
      </td>
      <td className="p-4">
        <div className="space-y-1">
          {processo.proximoPrazo && (
            <div className="flex items-center text-xs">
              <Calendar size={10} className="mr-1 text-orange-400" />
              <span className="text-gray-300">
                Prazo: {new Date(processo.proximoPrazo).toLocaleDateString('pt-BR')}
              </span>
            </div>
          )}
          {processo.proximaAudiencia && (
            <div className="flex items-center text-xs">
              <Clock size={10} className="mr-1 text-blue-400" />
              <span className="text-gray-300">
                Audiência: {new Date(processo.proximaAudiencia).toLocaleDateString('pt-BR')}
              </span>
            </div>
          )}
          <div className="text-xs text-gray-500">
            Dist: {new Date(processo.dataDistribuicao).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </td>
      <td className="p-4">
        <div className="text-center">
          <div className="text-white font-medium">{processo.andamentos}</div>
          <div className="text-xs text-gray-500">andamentos</div>
          <div className="text-xs text-gray-400">
            Último: {new Date(processo.ultimoAndamento).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center justify-center space-x-1">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Eye size={14} />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Edit size={14} />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
            <ExternalLink size={14} />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
            <Trash2 size={14} />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ProcessTableRow;
