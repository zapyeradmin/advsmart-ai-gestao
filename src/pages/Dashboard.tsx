
import React, { useState } from 'react';
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
import PermissionGuard from '@/components/auth/PermissionGuard';

const Dashboard = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSaveClient = (clientData: any) => {
    toast({
      title: "Sucesso!",
      description: "Cliente cadastrado com sucesso.",
    });
  };

  const stats = [
    {
      title: 'Total de Clientes',
      value: '147',
      icon: Users,
      change: { value: '+12%', type: 'increase' as const, label: 'vs. mês anterior' },
      iconColor: 'bg-blue-900/30 text-primary'
    },
    {
      title: 'Processos Ativos',
      value: '89',
      icon: FileText,
      change: { value: '+3%', type: 'neutral' as const, label: 'vs. mês anterior' },
      iconColor: 'bg-purple-900/30 text-purple-400'
    },
    {
      title: 'Receitas do Mês',
      value: 'R$ 78.450',
      icon: DollarSign,
      change: { value: '+18%', type: 'increase' as const, label: 'vs. mês anterior' },
      iconColor: 'bg-green-900/30 text-green-400'
    },
    {
      title: 'Prazos Pendentes',
      value: '12',
      icon: Calendar,
      change: { value: '5', type: 'decrease' as const, label: 'prazos críticos' },
      iconColor: 'bg-red-900/30 text-red-400'
    }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Preparar contestação - Processo nº 0001234-12.2023',
      date: 'Hoje, 14:00',
      priority: 'Urgente',
      priorityColor: 'bg-red-900/50 text-red-400'
    },
    {
      id: 2,
      title: 'Revisar contrato Empresa XYZ Ltda.',
      date: 'Amanhã, 10:00',
      priority: 'Média',
      priorityColor: 'bg-yellow-900/50 text-yellow-400'
    },
    {
      id: 3,
      title: 'Agendar reunião com cliente João Silva',
      date: '10/06/2025, 15:30',
      priority: 'Baixa',
      priorityColor: 'bg-blue-900/50 text-blue-400'
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      type: 'Audiência de Instrução e Julgamento',
      process: 'Processo nº 0001234-12.2023.8.26.0100',
      client: 'Maria Fernandes',
      date: 'Hoje',
      time: '14:30',
      status: 'critical' as const
    },
    {
      id: 2,
      type: 'Prazo para Recurso',
      process: 'Processo nº 0005678-45.2023.8.26.0100',
      client: 'Empresa ABC Ltda.',
      date: 'Amanhã',
      time: '23:59',
      status: 'warning' as const
    },
    {
      id: 3,
      type: 'Reunião com Cliente',
      process: 'Consultoria Empresarial',
      client: 'Startup XYZ',
      date: '12/06/2025',
      time: '10:00',
      status: 'normal' as const
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Novo processo cadastrado',
      description: '0009876-54.2023.8.26.0100',
      client: 'Empresa DEF Ltda.',
      responsible: 'Dr. Ricardo Oliveira',
      time: 'Hoje, 11:23',
      icon: 'file' as const,
      color: 'bg-blue-900/30 text-primary'
    },
    {
      id: 2,
      type: 'Pagamento recebido',
      description: 'R$ 2.500,00',
      client: 'João Carlos Mendes',
      responsible: 'Fatura #INV-2023-056',
      time: 'Hoje, 09:45',
      icon: 'dollar' as const,
      color: 'bg-green-900/30 text-green-400'
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
            <TasksWidget tasks={tasks} />
            <DeadlinesWidget deadlines={upcomingDeadlines} />
          </div>

          {/* Recent Activity */}
          <RecentActivityWidget activities={recentActivities} />
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
