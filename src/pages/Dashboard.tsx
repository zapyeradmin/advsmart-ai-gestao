
import React, { useState, useMemo } from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import AdminWidgets from '@/components/dashboard/AdminWidgets';
import TasksWidget from '@/components/dashboard/TasksWidget';
import DeadlinesWidget from '@/components/dashboard/DeadlinesWidget';
import RecentActivityWidget from '@/components/dashboard/RecentActivityWidget';
import QuickActions from '@/components/dashboard/QuickActions';
import TaskCalendar from '@/components/calendar/TaskCalendar';
import ClientModal from '@/components/modals/ClientModal';
import RevenueChart from '@/components/charts/RevenueChart';
import ProcessChart from '@/components/charts/ProcessChart';
import { Users, FileText, DollarSign, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { useIntegratedData } from '@/hooks/useIntegratedData';
import PermissionGuard from '@/components/auth/PermissionGuard';

const Dashboard = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const { user } = useAuth();
  const { metricas, processos, transacoes, clientes } = useIntegratedData();

  const handleSaveClient = (clientData: any) => {
    toast({
      title: "Sucesso!",
      description: "Cliente cadastrado com sucesso.",
    });
  };

  // Calcular dados dinâmicos baseados nos dados reais
  const dynamicData = useMemo(() => {
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    // Processos com prazos críticos (próximos 7 dias)
    const prazosVencendo = processos.filter(p => {
      if (!p.proximoPrazo) return false;
      const prazoDate = new Date(p.proximoPrazo);
      const diffTime = prazoDate.getTime() - hoje.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    });

    // Atividades recentes baseadas em dados reais
    const atividadesRecentes = [
      ...processos.slice(0, 2).map(processo => ({
        id: parseInt(processo.id),
        type: 'Novo processo cadastrado',
        description: processo.numero,
        client: clientes.find(c => c.id === processo.clienteId)?.nome || 'Cliente não encontrado',
        responsible: processo.responsavel,
        time: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        icon: 'file' as const,
        color: 'bg-blue-900/30 text-primary'
      })),
      ...transacoes.filter(t => t.status === 'Pago').slice(0, 1).map(transacao => ({
        id: parseInt(transacao.id),
        type: 'Pagamento recebido',
        description: `R$ ${transacao.valor.toLocaleString('pt-BR')}`,
        client: clientes.find(c => c.id === transacao.clienteId)?.nome || 'Cliente não encontrado',
        responsible: `${transacao.categoria} - ${transacao.descricao}`,
        time: new Date(transacao.data).toLocaleDateString('pt-BR') + ', ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        icon: 'dollar' as const,
        color: 'bg-green-900/30 text-green-400'
      }))
    ];

    // Tarefas baseadas em processos com prazos
    const tarefas = processos
      .filter(p => p.proximoPrazo)
      .slice(0, 3)
      .map(processo => {
        const prazoDate = new Date(processo.proximoPrazo!);
        const diffTime = prazoDate.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let priority = 'Baixa';
        let priorityColor = 'bg-blue-900/50 text-blue-400';
        
        if (diffDays <= 1) {
          priority = 'Urgente';
          priorityColor = 'bg-red-900/50 text-red-400';
        } else if (diffDays <= 3) {
          priority = 'Média';
          priorityColor = 'bg-yellow-900/50 text-yellow-400';
        }

        return {
          id: parseInt(processo.id),
          title: `${processo.assunto} - Processo nº ${processo.numero}`,
          date: diffDays === 0 ? 'Hoje' : diffDays === 1 ? 'Amanhã' : prazoDate.toLocaleDateString('pt-BR'),
          priority,
          priorityColor
        };
      });

    // Próximos prazos
    const proximosPrazos = processos
      .filter(p => p.proximoPrazo)
      .sort((a, b) => new Date(a.proximoPrazo!).getTime() - new Date(b.proximoPrazo!).getTime())
      .slice(0, 3)
      .map(processo => {
        const prazoDate = new Date(processo.proximoPrazo!);
        const diffTime = prazoDate.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let status: 'critical' | 'warning' | 'normal' = 'normal';
        let dateText = prazoDate.toLocaleDateString('pt-BR');
        
        if (diffDays === 0) {
          status = 'critical';
          dateText = 'Hoje';
        } else if (diffDays === 1) {
          status = 'warning';
          dateText = 'Amanhã';
        } else if (diffDays <= 3) {
          status = 'warning';
        }

        return {
          id: parseInt(processo.id),
          type: 'Prazo Processual',
          process: `Processo nº ${processo.numero}`,
          client: clientes.find(c => c.id === processo.clienteId)?.nome || 'Cliente não encontrado',
          date: dateText,
          time: '23:59',
          status
        };
      });

    return {
      prazosVencendo: prazosVencendo.length,
      prazosHoje: prazosVencendo.filter(p => {
        const prazoDate = new Date(p.proximoPrazo!);
        return prazoDate.toDateString() === hoje.toDateString();
      }).length,
      atividadesRecentes,
      tarefas,
      proximosPrazos
    };
  }, [processos, transacoes, clientes]);

  // Stats baseados em dados reais
  const stats = [
    {
      title: 'Total de Clientes',
      value: metricas.clientes.total.toString(),
      icon: Users,
      change: { 
        value: `+${metricas.clientes.novosNoMes}`, 
        type: 'increase' as const, 
        label: 'novos este mês' 
      },
      iconColor: 'bg-blue-900/30 text-primary'
    },
    {
      title: 'Processos Ativos',
      value: metricas.processos.emAndamento.toString(),
      icon: FileText,
      change: { 
        value: `${metricas.processos.taxaSucesso.toFixed(1)}%`, 
        type: 'neutral' as const, 
        label: 'taxa de sucesso' 
      },
      iconColor: 'bg-purple-900/30 text-purple-400'
    },
    {
      title: 'Receitas do Mês',
      value: `R$ ${metricas.financeiro.receitaTotal.toLocaleString('pt-BR')}`,
      icon: DollarSign,
      change: { 
        value: `${metricas.financeiro.margemLucratividade.toFixed(1)}%`, 
        type: 'increase' as const, 
        label: 'margem de lucro' 
      },
      iconColor: 'bg-green-900/30 text-green-400'
    },
    {
      title: 'Prazos Pendentes',
      value: dynamicData.prazosVencendo.toString(),
      icon: Calendar,
      change: { 
        value: dynamicData.prazosHoje.toString(), 
        type: dynamicData.prazosHoje > 0 ? 'decrease' as const : 'neutral' as const, 
        label: 'prazos hoje' 
      },
      iconColor: 'bg-red-900/30 text-red-400'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-gray-400">Bem-vindo de volta, {user?.name}. Aqui está um resumo da sua atividade.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${
            activeTab === 'overview'
              ? 'bg-primary text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Visão Geral
        </button>
        <PermissionGuard permission="canManageUsers">
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              activeTab === 'admin'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Administrativo
          </button>
        </PermissionGuard>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${
            activeTab === 'calendar'
              ? 'bg-primary text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Calendário
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RevenueChart />
            <ProcessChart />
          </div>

          {/* Tasks and Deadlines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <TasksWidget tasks={dynamicData.tarefas} />
            <DeadlinesWidget deadlines={dynamicData.proximosPrazos} />
          </div>

          {/* Recent Activity */}
          <RecentActivityWidget activities={dynamicData.atividadesRecentes} />
        </>
      )}

      {activeTab === 'admin' && <AdminWidgets />}

      {activeTab === 'calendar' && <TaskCalendar />}

      {/* Quick Actions */}
      <QuickActions onAddClient={() => setIsClientModalOpen(true)} />

      {/* Client Modal */}
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSave={handleSaveClient}
      />
    </div>
  );
};

export default Dashboard;
