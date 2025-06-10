import React, { useState } from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import AdminWidgets from '@/components/dashboard/AdminWidgets';
import TaskCalendar from '@/components/calendar/TaskCalendar';
import ClientModal from '@/components/modals/ClientModal';
import RevenueChart from '@/components/charts/RevenueChart';
import ProcessChart from '@/components/charts/ProcessChart';
import { Users, FileText, DollarSign, Calendar, Plus, CheckCircle, RefreshCw, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
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
      status: 'critical'
    },
    {
      id: 2,
      type: 'Prazo para Recurso',
      process: 'Processo nº 0005678-45.2023.8.26.0100',
      client: 'Empresa ABC Ltda.',
      date: 'Amanhã',
      time: '23:59',
      status: 'warning'
    },
    {
      id: 3,
      type: 'Reunião com Cliente',
      process: 'Consultoria Empresarial',
      client: 'Startup XYZ',
      date: '12/06/2025',
      time: '10:00',
      status: 'normal'
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
      icon: 'file',
      color: 'bg-blue-900/30 text-primary'
    },
    {
      id: 2,
      type: 'Pagamento recebido',
      description: 'R$ 2.500,00',
      client: 'João Carlos Mendes',
      responsible: 'Fatura #INV-2023-056',
      time: 'Hoje, 09:45',
      icon: 'dollar',
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
            {/* Tasks */}
            <div className="bg-dark-card rounded-lg p-5 border border-gray-800 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">Tarefas Pendentes</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-blue-400 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Nova Tarefa
                </Button>
              </div>
              
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center p-3 bg-gray-800 rounded-lg">
                    <label className="custom-checkbox mr-3 flex-shrink-0">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{task.title}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-400 mr-3">{task.date}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${task.priorityColor}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white ml-2">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-primary hover:text-blue-400">Ver todas as tarefas</a>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-dark-card rounded-lg p-5 border border-gray-800 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">Próximos Prazos</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs border-gray-600">Esta Semana</Button>
                  <Button variant="ghost" size="sm" className="text-xs">Próxima Semana</Button>
                </div>
              </div>
              
              <div className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-700">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={deadline.id} className="mb-6 relative">
                    <div className={`absolute left-[-29px] top-0 w-6 h-6 rounded-full border-4 border-dark-card z-10 ${
                      deadline.status === 'critical' ? 'bg-red-500' :
                      deadline.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block ${
                            deadline.status === 'critical' ? 'bg-red-900/50 text-red-400' :
                            deadline.status === 'warning' ? 'bg-yellow-900/50 text-yellow-400' :
                            'bg-blue-900/50 text-blue-400'
                          }`}>
                            {deadline.date}
                          </span>
                          <h4 className="text-white font-medium">{deadline.type}</h4>
                          <p className="text-sm text-gray-400 mt-1">{deadline.process}</p>
                          <p className="text-sm text-gray-400">Cliente: {deadline.client}</p>
                        </div>
                        <span className="text-sm font-medium text-white">{deadline.time}</span>
                      </div>
                      
                      <div className="flex items-center mt-3">
                        <Button size="sm" className="bg-primary hover:bg-primary-hover text-white mr-2">
                          <CheckCircle size={12} className="mr-1" />
                          Confirmar
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-200 border-gray-600">
                          <FileText size={12} className="mr-1" />
                          Ver detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-dark-card rounded-lg p-5 border border-gray-800 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white">Atividades Recentes</h3>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <RefreshCw size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex p-3 bg-gray-800 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${activity.color}`}>
                    {activity.icon === 'file' ? <FileText size={16} /> : <DollarSign size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">
                      {activity.type}: <span className="text-primary">{activity.description}</span>
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-400 mr-2">Cliente: {activity.client}</span>
                        <span className="text-xs text-gray-400">{activity.responsible}</span>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-primary hover:text-blue-400">Ver todas as atividades</a>
            </div>
          </div>
        </>
      )}

      {activeTab === 'admin' && <AdminWidgets />}

      {activeTab === 'calendar' && <TaskCalendar />}

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <Button
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-white shadow-lg"
          onClick={() => setIsClientModalOpen(true)}
        >
          <Plus size={24} />
        </Button>
      </div>

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
