
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, FileText, Users, Target } from 'lucide-react';

interface ReportsOverviewProps {
  data: {
    receita: number;
    despesas: number;
    casosAtivos: number;
    taxaSucesso: number;
    satisfacaoCliente: number;
    variacao: {
      receita: number;
      despesas: number;
      casos: number;
      sucesso: number;
      satisfacao: number;
    };
  };
}

const ReportsOverview: React.FC<ReportsOverviewProps> = ({ data }) => {
  const metricas = [
    {
      titulo: 'Receita Total',
      valor: `R$ ${data.receita.toLocaleString('pt-BR')}`,
      variacao: `${data.variacao.receita > 0 ? '+' : ''}${data.variacao.receita}%`,
      tipo: data.variacao.receita > 0 ? 'positivo' : 'negativo',
      icone: DollarSign,
      cor: 'success'
    },
    {
      titulo: 'Casos Ativos',
      valor: data.casosAtivos.toString(),
      variacao: `${data.variacao.casos > 0 ? '+' : ''}${data.variacao.casos}%`,
      tipo: data.variacao.casos > 0 ? 'positivo' : 'negativo',
      icone: FileText,
      cor: 'primary'
    },
    {
      titulo: 'Taxa de Sucesso',
      valor: `${data.taxaSucesso}%`,
      variacao: `${data.variacao.sucesso > 0 ? '+' : ''}${data.variacao.sucesso}%`,
      tipo: data.variacao.sucesso > 0 ? 'positivo' : 'negativo',
      icone: Target,
      cor: 'warning'
    },
    {
      titulo: 'Satisfação do Cliente',
      valor: `${data.satisfacaoCliente}/5`,
      variacao: `${data.variacao.satisfacao > 0 ? '+' : ''}${data.variacao.satisfacao}`,
      tipo: data.variacao.satisfacao > 0 ? 'positivo' : 'negativo',
      icone: Users,
      cor: 'secondary'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricas.map((metrica) => {
        const Icon = metrica.icone;
        return (
          <Card key={metrica.titulo} className="modern-card hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-dark-text mb-1">
                    {metrica.valor}
                  </div>
                  <div className="text-dark-text-secondary text-sm font-medium">
                    {metrica.titulo}
                  </div>
                </div>
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-${metrica.cor}/10 text-${metrica.cor}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className={`flex items-center text-sm font-medium ${
                  metrica.tipo === 'positivo' ? 'text-status-green' : 'text-status-red'
                }`}>
                  {metrica.tipo === 'positivo' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {metrica.variacao}
                </span>
                <span className="text-dark-text-secondary text-xs ml-2">vs. mês anterior</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ReportsOverview;
