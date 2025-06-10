
import React from 'react';
import { Transacao } from '@/types/financial';

interface CustosVariaveisSectionProps {
  transacoes: Transacao[];
}

const CustosVariaveisSection: React.FC<CustosVariaveisSectionProps> = ({ transacoes }) => {
  return (
    <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-medium text-white mb-4">Custos Variáveis</h3>
      <p className="text-gray-400 mb-4">Controle de custas processuais, parceiros e investimentos em marketing</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Custas Processuais</h4>
            <p className="text-2xl font-bold text-blue-400">
              R$ {transacoes.filter(t => t.categoria === 'Custas Processuais').reduce((sum, t) => sum + t.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Parceiros</h4>
            <p className="text-2xl font-bold text-purple-400">
              R$ {transacoes.filter(t => t.categoria === 'Parceiro Advogado').reduce((sum, t) => sum + t.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Marketing</h4>
            <p className="text-2xl font-bold text-orange-400">
              R$ {transacoes.filter(t => t.categoria.includes('Anúncios') || t.categoria.includes('Marketing')).reduce((sum, t) => sum + t.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Outros</h4>
            <p className="text-2xl font-bold text-gray-400">
              R$ {transacoes.filter(t => !['Custas Processuais', 'Parceiro Advogado', 'Anúncios', 'Marketing'].includes(t.categoria) && t.tipo === 'Despesa').reduce((sum, t) => sum + t.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustosVariaveisSection;
