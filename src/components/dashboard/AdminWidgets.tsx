
import React, { useMemo } from 'react';
import { Users, FileText, Calendar, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useIntegratedData } from '@/hooks/useIntegratedData';
import PermissionGuard from '@/components/auth/PermissionGuard';

const AdminWidgets = () => {
  const { user } = useAuth();
  const { metricas, processos, transacoes, clientes } = useIntegratedData();

  // Calcular estatísticas administrativas baseadas em dados reais
  const adminStats = useMemo(() => {
    const hoje = new Date();
    
    // Responsáveis únicos (simula equipe ativa)
    const responsaveisUnicos = new Set(processos.map(p => p.responsavel).filter(Boolean));
    const equipeAtiva = responsaveisUnicos.size;

    // Processos críticos (prazos vencendo hoje ou vencidos)
    const processosCriticos = processos.filter(p => {
      if (!p.proximoPrazo) return false;
      const prazoDate = new Date(p.proximoPrazo);
      return prazoDate <= hoje;
    }).length;

    // Processos finalizados este mês
    const processosFinalizadosNoMes = processos.filter(p => {
      if (p.status !== 'Finalizado') return false;
      // Como não temos data de finalização, vamos usar a data de distribuição como proxy
      const dataDistribuicao = new Date(p.dataDistribuicao);
      return dataDistribuicao.getMonth() === hoje.getMonth() && dataDistribuicao.getFullYear() === hoje.getFullYear();
    }).length;

    // Calcular produtividade (processos finalizados vs total)
    const produtividade = processos.length > 0 ? (metricas.processos.finalizados / processos.length) * 100 : 0;

    // Receita mensal
    const receitaMensal = metricas.financeiro.receitaTotal;

    return [
      {
        title: 'Equipe Ativa',
        value: equipeAtiva.toString(),
        icon: Users,
        change: { value: '+2', type: 'increase' as const, label: 'novos este mês' },
        iconColor: 'bg-blue-900/30 text-blue-400'
      },
      {
        title: 'Processos Críticos',
        value: processosCriticos.toString(),
        icon: AlertTriangle,
        change: { value: processosCriticos.toString(), type: processosCriticos > 0 ? 'decrease' as const : 'neutral' as const, label: 'prazos hoje' },
        iconColor: 'bg-red-900/30 text-red-400'
      },
      {
        title: 'Produtividade',
        value: `${produtividade.toFixed(0)}%`,
        icon: TrendingUp,
        change: { value: `+${processosFinalizadosNoMes}`, type: 'increase' as const, label: 'finalizados no mês' },
        iconColor: 'bg-green-900/30 text-green-400'
      },
      {
        title: 'Receita Mensal',
        value: `R$ ${(receitaMensal / 1000).toFixed(1)}k`,
        icon: DollarSign,
        change: { value: `${metricas.financeiro.margemLucratividade.toFixed(1)}%`, type: 'increase' as const, label: 'vs. meta' },
        iconColor: 'bg-purple-900/30 text-purple-400'
      }
    ];
  }, [metricas, processos, clientes]);

  // Atividade da equipe baseada em dados reais
  const teamActivity = useMemo(() => {
    const responsaveis = Array.from(new Set(processos.map(p => p.responsavel).filter(Boolean)));
    
    return responsaveis.slice(0, 3).map((responsavel, index) => {
      const processosDoResponsavel = processos.filter(p => p.responsavel === responsavel);
      const processosAtivos = processosDoResponsavel.filter(p => p.status === 'Em Andamento');
      const processosFinalizados = processosDoResponsavel.filter(p => p.status === 'Finalizado');
      
      let activity = '';
      let status = 'working';
      
      if (processosFinalizados.length > 0) {
        activity = `Finalizou ${processosFinalizados.length} processo(s)`;
        status = 'completed';
      } else if (processosAtivos.length > 0) {
        activity = `Acompanhando ${processosAtivos.length} processo(s) ativo(s)`;
        status = 'active';
      } else {
        activity = 'Aguardando novos processos';
        status = 'working';
      }

      return {
        id: index + 1,
        name: responsavel,
        role: index === 0 ? 'Advogado Sênior' : index === 1 ? 'Advogada Plena' : 'Advogado',
        activity,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status
      };
    });
  }, [processos]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/50 text-green-400';
      case 'active':
        return 'bg-blue-900/50 text-blue-400';
      case 'working':
        return 'bg-yellow-900/50 text-yellow-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  return (
    <PermissionGuard permission="canManageUsers">
      <div className="space-y-6">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-dark-card rounded-lg p-6 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm ${
                        stat.change.type === 'increase' ? 'text-green-400' : 
                        stat.change.type === 'decrease' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {stat.change.value}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">{stat.change.label}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.iconColor}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Atividade da Equipe</h3>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                Ver Todos
              </Button>
            </div>
            <div className="space-y-4">
              {teamActivity.length > 0 ? teamActivity.map((activity) => (
                <div key={activity.id} className="flex items-center p-3 bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                    <Users size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{activity.name}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status === 'completed' ? 'Concluído' : 
                         activity.status === 'active' ? 'Ativo' : 'Trabalhando'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{activity.role}</p>
                    <p className="text-sm text-gray-300 mt-1">{activity.activity}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-4">
                  <p className="text-gray-400">Nenhuma atividade de equipe encontrada</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-medium text-white mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-20 flex flex-col items-center justify-center bg-primary hover:bg-primary-hover">
                <Users size={20} className="mb-2" />
                <span className="text-sm">Adicionar Membro</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center bg-gray-700 hover:bg-gray-600">
                <FileText size={20} className="mb-2" />
                <span className="text-sm">Novo Processo</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center bg-gray-700 hover:bg-gray-600">
                <Calendar size={20} className="mb-2" />
                <span className="text-sm">Agendar Tarefa</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center bg-gray-700 hover:bg-gray-600">
                <DollarSign size={20} className="mb-2" />
                <span className="text-sm">Relatório Financeiro</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
};

export default AdminWidgets;
