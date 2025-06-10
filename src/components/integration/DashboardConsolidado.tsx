
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { useIntegratedData } from '@/hooks/useIntegratedData';

const DashboardConsolidado = () => {
  const { metricas, clientes, processos, transacoes, gerarRelatorioConsolidado } = useIntegratedData();

  const relatorio = gerarRelatorioConsolidado(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    new Date().toISOString().split('T')[0]
  );

  const cards = [
    {
      titulo: 'Clientes Ativos',
      valor: metricas.clientes.ativos,
      total: metricas.clientes.total,
      icone: Users,
      cor: 'text-blue-400',
      bgCor: 'bg-blue-500/10',
      variacao: `+${metricas.clientes.novosNoMes} este mês`
    },
    {
      titulo: 'Processos em Andamento',
      valor: metricas.processos.emAndamento,
      total: metricas.processos.total,
      icone: FileText,
      cor: 'text-purple-400',
      bgCor: 'bg-purple-500/10',
      variacao: `${metricas.processos.taxaSucesso.toFixed(1)}% taxa de sucesso`
    },
    {
      titulo: 'Receita do Mês',
      valor: `R$ ${metricas.financeiro.receitaTotal.toLocaleString('pt-BR')}`,
      total: null,
      icone: DollarSign,
      cor: 'text-green-400',
      bgCor: 'bg-green-500/10',
      variacao: `${metricas.financeiro.margemLucratividade.toFixed(1)}% margem`
    },
    {
      titulo: 'Parceiros Ativos',
      valor: metricas.parceiros.ativos,
      total: metricas.parceiros.total,
      icone: Target,
      cor: 'text-amber-400',
      bgCor: 'bg-amber-500/10',
      variacao: `${metricas.parceiros.clientesIndicadosTotal} indicações`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icone;
          return (
            <Card key={index} className="modern-card border-slate-700/50 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-slate-100 mb-1">
                      {card.valor}
                      {card.total && (
                        <span className="text-sm text-slate-400 ml-2">
                          /{card.total}
                        </span>
                      )}
                    </div>
                    <div className="text-slate-300 text-sm font-medium mb-2">
                      {card.titulo}
                    </div>
                    <div className="text-xs text-slate-400">
                      {card.variacao}
                    </div>
                  </div>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${card.bgCor}`}>
                    <Icon size={24} className={card.cor} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alertas e Notificações */}
      {relatorio.alertas.length > 0 && (
        <Card className="modern-card border-amber-700/50">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <AlertTriangle size={20} className="text-amber-400" />
              Alertas e Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {relatorio.alertas.map((alerta, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alerta.tipo === 'error' ? 'bg-red-400' :
                    alerta.tipo === 'warning' ? 'bg-amber-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium text-slate-100">{alerta.titulo}</div>
                    <div className="text-sm text-slate-300">{alerta.descricao}</div>
                  </div>
                  <Badge variant={alerta.tipo === 'error' ? 'destructive' : 'secondary'}>
                    {alerta.tipo}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Distribuição por Origem de Clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="modern-card border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-100">Origem dos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(metricas.clientes.porOrigem).map(([origem, quantidade]) => (
                <div key={origem} className="flex items-center justify-between">
                  <span className="text-slate-300">{origem}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-400 rounded-full"
                        style={{ 
                          width: `${(quantidade / metricas.clientes.total) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-slate-100 font-medium w-8 text-right">
                      {quantidade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-100">Áreas Jurídicas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(metricas.processos.porArea).map(([area, quantidade]) => (
                <div key={area} className="flex items-center justify-between">
                  <span className="text-slate-300">{area}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-400 rounded-full"
                        style={{ 
                          width: `${(quantidade / metricas.processos.total) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-slate-100 font-medium w-8 text-right">
                      {quantidade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores Financeiros */}
      <Card className="modern-card border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-slate-100">Resumo Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                R$ {metricas.financeiro.receitaTotal.toLocaleString('pt-BR')}
              </div>
              <div className="text-slate-300 text-sm">Receitas Realizadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">
                R$ {metricas.financeiro.despesaTotal.toLocaleString('pt-BR')}
              </div>
              <div className="text-slate-300 text-sm">Despesas do Período</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                metricas.financeiro.saldoAtual >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                R$ {metricas.financeiro.saldoAtual.toLocaleString('pt-BR')}
              </div>
              <div className="text-slate-300 text-sm">Saldo Atual</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <Card className="modern-card border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-slate-100">Ações Rápidas Integradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center gap-2">
              <Users size={24} />
              <span className="text-sm">Novo Cliente</span>
            </Button>
            <Button className="h-20 flex flex-col items-center gap-2" variant="outline">
              <FileText size={24} />
              <span className="text-sm">Novo Processo</span>
            </Button>
            <Button className="h-20 flex flex-col items-center gap-2" variant="outline">
              <DollarSign size={24} />
              <span className="text-sm">Lançamento</span>
            </Button>
            <Button className="h-20 flex flex-col items-center gap-2" variant="outline">
              <Target size={24} />
              <span className="text-sm">Relatório</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardConsolidado;
