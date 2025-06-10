
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
      cor: 'emerald',
      bgCor: 'bg-emerald-500/10',
      iconeCor: 'text-emerald-400'
    },
    {
      titulo: 'Casos Ativos',
      valor: data.casosAtivos.toString(),
      variacao: `${data.variacao.casos > 0 ? '+' : ''}${data.variacao.casos}%`,
      tipo: data.variacao.casos > 0 ? 'positivo' : 'negativo',
      icone: FileText,
      cor: 'blue',
      bgCor: 'bg-blue-500/10',
      iconeCor: 'text-blue-400'
    },
    {
      titulo: 'Taxa de Sucesso',
      valor: `${data.taxaSucesso}%`,
      variacao: `${data.variacao.sucesso > 0 ? '+' : ''}${data.variacao.sucesso}%`,
      tipo: data.variacao.sucesso > 0 ? 'positivo' : 'negativo',
      icone: Target,
      cor: 'amber',
      bgCor: 'bg-amber-500/10',
      iconeCor: 'text-amber-400'
    },
    {
      titulo: 'Satisfação do Cliente',
      valor: `${data.satisfacaoCliente}/5`,
      variacao: `${data.variacao.satisfacao > 0 ? '+' : ''}${data.variacao.satisfacao}`,
      tipo: data.variacao.satisfacao > 0 ? 'positivo' : 'negativo',
      icone: Users,
      cor: 'purple',
      bgCor: 'bg-purple-500/10',
      iconeCor: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricas.map((metrica) => {
        const Icon = metrica.icone;
        return (
          <Card key={metrica.titulo} className="modern-card hover:scale-105 transition-all duration-300 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-slate-100 mb-1">
                    {metrica.valor}
                  </div>
                  <div className="text-slate-300 text-sm font-medium">
                    {metrica.titulo}
                  </div>
                </div>
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${metrica.bgCor} ${metrica.iconeCor}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className={`flex items-center text-sm font-semibold ${
                  metrica.tipo === 'positivo' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {metrica.tipo === 'positivo' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {metrica.variacao}
                </span>
                <span className="text-slate-400 text-xs ml-2 font-medium">vs. mês anterior</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ReportsOverview;
