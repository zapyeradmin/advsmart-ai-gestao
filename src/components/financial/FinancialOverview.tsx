
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Transacao } from '@/types/financial';

interface FinancialOverviewProps {
  transacoes: Transacao[];
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ transacoes }) => {
  // Cálculos para visão geral
  const totalReceitas = transacoes.filter(t => t.tipo === 'Receita' && t.status === 'Pago').reduce((sum, t) => sum + t.valor, 0);
  const totalDespesas = transacoes.filter(t => t.tipo === 'Despesa' && t.status === 'Pago').reduce((sum, t) => sum + t.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-green-400">
              R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-gray-400 text-sm">Total Receitas</div>
          </div>
          <TrendingUp className="text-green-400" size={24} />
        </div>
      </div>
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-red-400">
              R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-gray-400 text-sm">Total Despesas</div>
          </div>
          <TrendingDown className="text-red-400" size={24} />
        </div>
      </div>
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-gray-400 text-sm">Saldo Atual</div>
          </div>
          <DollarSign className={saldo >= 0 ? 'text-green-400' : 'text-red-400'} size={24} />
        </div>
      </div>
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="text-2xl font-bold text-yellow-400">
          {transacoes.filter(t => t.status === 'Pendente').length}
        </div>
        <div className="text-gray-400 text-sm">Pendências</div>
      </div>
    </div>
  );
};

export default FinancialOverview;
