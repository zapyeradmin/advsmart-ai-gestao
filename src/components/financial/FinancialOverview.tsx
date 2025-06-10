
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';
import { Transacao } from '@/types/financial';

interface FinancialOverviewProps {
  transacoes: Transacao[];
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ transacoes }) => {
  // Cálculos para visão geral
  const totalReceitas = transacoes.filter(t => t.tipo === 'Receita' && t.status === 'Pago').reduce((sum, t) => sum + t.valor, 0);
  const totalDespesas = transacoes.filter(t => t.tipo === 'Despesa' && t.status === 'Pago').reduce((sum, t) => sum + t.valor, 0);
  const saldo = totalReceitas - totalDespesas;
  const pendencias = transacoes.filter(t => t.status === 'Pendente').length;

  const cards = [
    {
      title: 'Total Receitas',
      value: totalReceitas,
      icon: TrendingUp,
      color: 'text-status-green',
      bgColor: 'bg-gradient-to-r from-status-green/10 to-status-green/5',
      borderColor: 'border-status-green/20'
    },
    {
      title: 'Total Despesas',
      value: totalDespesas,
      icon: TrendingDown,
      color: 'text-status-red',
      bgColor: 'bg-gradient-to-r from-status-red/10 to-status-red/5',
      borderColor: 'border-status-red/20'
    },
    {
      title: 'Saldo Atual',
      value: saldo,
      icon: DollarSign,
      color: saldo >= 0 ? 'text-status-green' : 'text-status-red',
      bgColor: saldo >= 0 ? 'bg-gradient-to-r from-status-green/10 to-status-green/5' : 'bg-gradient-to-r from-status-red/10 to-status-red/5',
      borderColor: saldo >= 0 ? 'border-status-green/20' : 'border-status-red/20'
    },
    {
      title: 'Pendências',
      value: pendencias,
      icon: AlertCircle,
      color: 'text-status-yellow',
      bgColor: 'bg-gradient-to-r from-status-yellow/10 to-status-yellow/5',
      borderColor: 'border-status-yellow/20',
      isCount: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`modern-card p-6 border ${card.borderColor} ${card.bgColor} hover:scale-105 transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className={`text-2xl font-bold ${card.color} mb-1`}>
                  {card.isCount 
                    ? card.value 
                    : `R$ ${card.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                  }
                </div>
                <div className="text-dark-text-secondary text-sm font-medium">
                  {card.title}
                </div>
              </div>
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${card.bgColor} ${card.color}`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FinancialOverview;
