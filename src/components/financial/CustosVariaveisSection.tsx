
import React from 'react';
import { Transacao } from '@/types/financial';

interface CustosVariaveisSectionProps {
  transacoes: Transacao[];
}

const CustosVariaveisSection: React.FC<CustosVariaveisSectionProps> = ({ transacoes }) => {
  const categorias = [
    {
      nome: 'Custas Processuais',
      categoria: 'Custas Processuais',
      cor: 'text-status-blue',
      bgColor: 'bg-gradient-to-br from-status-blue/20 to-status-blue/10',
      borderColor: 'border-status-blue/30'
    },
    {
      nome: 'Parceiros',
      categoria: 'Parceiro Advogado',
      cor: 'text-status-purple',
      bgColor: 'bg-gradient-to-br from-status-purple/20 to-status-purple/10',
      borderColor: 'border-status-purple/30'
    },
    {
      nome: 'Marketing',
      categoria: ['Anúncios', 'Marketing'],
      cor: 'text-status-orange',
      bgColor: 'bg-gradient-to-br from-status-orange/20 to-status-orange/10',
      borderColor: 'border-status-orange/30'
    },
    {
      nome: 'Outros',
      categoria: 'outros',
      cor: 'text-dark-text-secondary',
      bgColor: 'bg-gradient-to-br from-dark-surface/50 to-dark-surface/20',
      borderColor: 'border-dark-border'
    }
  ];

  const calcularValor = (categoria: any) => {
    if (categoria.categoria === 'outros') {
      return transacoes.filter(t => 
        !['Custas Processuais', 'Parceiro Advogado', 'Anúncios', 'Marketing'].includes(t.categoria) && 
        t.tipo === 'Despesa'
      ).reduce((sum, t) => sum + t.valor, 0);
    }
    
    if (Array.isArray(categoria.categoria)) {
      return transacoes.filter(t => 
        categoria.categoria.some((cat: string) => t.categoria.includes(cat))
      ).reduce((sum, t) => sum + t.valor, 0);
    }
    
    return transacoes.filter(t => t.categoria === categoria.categoria).reduce((sum, t) => sum + t.valor, 0);
  };

  return (
    <div className="modern-card p-8 border border-dark-border">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-dark-text mb-2">Custos Variáveis</h3>
        <p className="text-dark-text-secondary">Controle de custas processuais, parceiros e investimentos em marketing</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categorias.map((categoria) => {
          const valor = calcularValor(categoria);
          
          return (
            <div
              key={categoria.nome}
              className={`${categoria.bgColor} border ${categoria.borderColor} rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-card hover:shadow-card-hover`}
            >
              <h4 className="text-dark-text font-semibold mb-3 text-lg">{categoria.nome}</h4>
              <p className={`text-3xl font-bold ${categoria.cor} mb-1`}>
                R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="text-dark-text-muted text-sm">
                {transacoes.filter(t => {
                  if (categoria.categoria === 'outros') {
                    return !['Custas Processuais', 'Parceiro Advogado', 'Anúncios', 'Marketing'].includes(t.categoria) && t.tipo === 'Despesa';
                  }
                  if (Array.isArray(categoria.categoria)) {
                    return categoria.categoria.some((cat: string) => t.categoria.includes(cat));
                  }
                  return t.categoria === categoria.categoria;
                }).length} transações
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustosVariaveisSection;
